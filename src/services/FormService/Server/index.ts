import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'

import ClassRoomSubjectRepository from 'store/prisma/ClassRoomSubjectRepository'
import TaskItemImageRepository from 'store/prisma/ImageQuestionRepository'
import StudentRepository from 'store/prisma/StudentRepository'
import TaskItemOptionRepository from 'store/prisma/TaskItemOptionRepository'
import TaskItemRepository from 'store/prisma/TaskItemRepository'
import TaskItemResponseRepository from 'store/prisma/TaskItemResponseRepository'
import TaskRepository from 'store/prisma/TaskRepository'

// import { IncomingMessage } from 'connect'
import { dateClone } from 'utils/helpers/Date'

import { createFormHandleError } from '../error'
import { ConfigFormPushProps, ConfigResponseFormPushProps } from '../types'

export const serverListFormService = async (req: NextApiRequest) => {
  const classSubjectId = Number(req.query.id)
  const taskRepo = new TaskRepository()
  return await taskRepo.listTasks(classSubjectId)
}

export const serverGetFormByIdService = async (classSubjectId: number, id: number): Promise<ConfigFormPushProps> => {
  // const classSubjectId = Number(req.query.id)
  const formData = await new TaskRepository().findById(id)
  if (!formData) throw new Error('Formulário não encontrado')

  const classSubject = await new ClassRoomSubjectRepository().findTeacherName(classSubjectId)
  if (!classSubject) throw new Error('Matéria não encontrada')

  return {
    id: formData.id,
    deadline: formData.deadline.toUTCString(),
    startline: formData.startline.toUTCString(),
    viewAnswer: formData.viewAnswer,
    description: formData.description,
    classSubjectId: classSubjectId,
    teacherName: classSubject.teacher.user.name,
    subjectName: classSubject.courseSubject.name,
    taskItems: formData.taskItems
      .map(i => ({
        id: i.id,
        title: i.title,
        isRequireActive: i.isRequireActive,
        typeOptionQuestion: getQuestionTypeString(i.typeOptionQuestion),
        answer: i.answer,
        text: i.text,
        number: i.number,
        points: i.points,
        radioOrCheckOptions: i.taskItemOptions
          .sort((cur, prev) => prev.letter > cur.letter ? -1 : 1)
          .map(i => ({
            id: i.id,
            letter: i.letter,
            description: i.description,
            isCheckedProf: i.isCheckedProf,
            isCheckedStudent: i.isCheckedStudent
          })),
        taskItemImages: i.taskItemImages.map(i => (
          {
            id: i.id,
            base64: i.image
          }
        ))
      }))
  }
}

// const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
export const serverGetFormResponseByIdService = async (classSubjectId: number, id: number): Promise<ConfigFormPushProps> => {
  const { taskItems, startline, ...formData } = await serverGetFormByIdService(classSubjectId, id)

  return {
    ...formData,
    startline,
    taskItems: taskItems.map(({ radioOrCheckOptions, text, ...taskItem }) => ({
      ...taskItem,
      text: '',
      radioOrCheckOptions: radioOrCheckOptions.map(({ isCheckedProf, ...radioOrCheckOption }) => ({
        ...radioOrCheckOption,
        isCheckedProf: false
      }))
    }))
  }
}

export const serverPushFormService = async (req: NextApiRequest) => {
  const formPush: ConfigFormPushProps = req.body
  const { taskItems, classSubjectId, subjectName, teacherName, ...configFormPushData } = formPush
  const classRoomSubjectId = Number(req.query.id)

  createFormHandleError(formPush)

  // Instanciar Repositories
  const classSubjectRepo = new ClassRoomSubjectRepository()
  const taskRepo = new TaskRepository()
  const taskItemRepo = new TaskItemRepository()
  const taskItemOptionRepo = new TaskItemOptionRepository()
  const taskItemImageRepo = new TaskItemImageRepository()

  const validClassSubject = await classSubjectRepo.findById(classRoomSubjectId)
  if (!validClassSubject) { throw new Error('Matéria inválida') }

  const deadline = dateClone(configFormPushData.deadline)
  const startline = dateClone(configFormPushData.startline)

  if (!deadline) throw new Error('Data inválida')

  if (!startline) throw new Error('Data inválida')

  // Gravar Task
  const { id: taskId } = await taskRepo.pushSet({
    ...configFormPushData, deadline, startline, classRoomSubjectId
  })

  const taskItemsIdToNotDelete = taskItems.filter(i => i.id >= 1).map(i => i.id)

  // Gravar Items
  await taskItemRepo.deleteNotRange(taskItemsIdToNotDelete, taskId)
  await Promise.all(
    taskItems
      .map(i => ({ ...i, id: i.id < 1 ? 0 : i.id }))
      .map(async taskItem => {
        const { id: taskItemCreatedId } = await taskItemRepo.pushSet({
          id: taskItem.id,
          title: taskItem.title,
          isRequireActive: taskItem.isRequireActive,
          typeOptionQuestion: getQuestionType(taskItem.typeOptionQuestion),
          text: taskItem.text,
          number: taskItem.number,
          points: taskItem.points,
          answer: taskItem.answer,
          taskId
          // taskId: taskId
        })

        // Gravar Item Options
        const taskItemOptions = taskItem.radioOrCheckOptions

        if (taskItem.id >= 1) {
          const taskItemOptionsIdToNotDelete = taskItemOptions.filter(i => i.id >= 1).map(j => j.id)
          await taskItemOptionRepo.deleteNotRange(taskItemOptionsIdToNotDelete, taskItemCreatedId)
        }
        await taskItemOptionRepo.pushSetRange(taskItemOptions
          .map(i => ({ ...i, id: i.id < 1 ? 0 : i.id }))
          .map(i => ({
            id: i.id,
            description: i.description,
            letter: i.letter,
            isCheckedProf: i.isCheckedProf,
            isCheckedStudent: i.isCheckedStudent,
            taskItemId: taskItemCreatedId
          }))
        )

        // Gravar Images
        const taskItemImages = taskItem.taskItemImages

        if (taskItem.id >= 1) {
          const taskItemImagesIdToNotDelete = taskItemImages.filter(i => i.id >= 1).map(i => i.id)
          await taskItemImageRepo.deleteNotRange(taskItemImagesIdToNotDelete, taskItemCreatedId)
        }
        await taskItemImageRepo.pushSetRange(taskItemImages
          .map(i => ({ ...i, id: i.id < 1 ? 0 : i.id }))
          .map(i => ({
            id: i.id,
            image: i.base64,
            taskItemId: taskItemCreatedId
          }))
        )
      })
  )
}

// 1 - Radio, 2- Checkbox, 3 - shortResp, 4 - paragraph
export const getQuestionType = (questionType: String): number => {
  if (questionType === 'radio') return 1
  if (questionType === 'checkbox') return 2
  if (questionType === 'shortResp') return 3
  if (questionType === 'paragraph') return 4
  return 0
}

export const getQuestionTypeString = (questionType: number): 'radio' | 'checkbox' | 'shortResp' | 'paragraph' => {
  if (questionType === 1) return 'radio'
  if (questionType === 2) return 'checkbox'
  if (questionType === 3) return 'shortResp'
  if (questionType === 4) return 'paragraph'
  return 'radio'
}

export const serverPushFormResponseService = async (req: NextApiRequest) => {
  const formResponsePush: ConfigResponseFormPushProps = req.body

  // Pegar info do token
  const tokenPayload = getJwtPayloadService({ req })
  const userId = tokenPayload.userId
  // const { taskItems, ...configFormPushData } = formPush
  const classSubjectId = Number(req.query.id)

  // createFormHandleError(formPush)

  // Instanciar Repositories
  const taskItemResponseRepo = new TaskItemResponseRepository()
  const classSubjectRepo = new ClassRoomSubjectRepository()
  const studentRepo = new StudentRepository()

  // Pegar classroom id
  const classSubject = await classSubjectRepo.findById(classSubjectId)
  if (!classSubject) { throw new Error('Matéria não registrada') }
  if (!classSubject?.classRoomId) { throw new Error('Turma informada não registrada') }
  const { classRoomId } = classSubject

  // Pegar StudentId
  // select student by classroom e user id
  const student = await studentRepo.findByUserClassRoom(userId, classRoomId)
  if (!student) { throw new Error('Estudante não registrado') }

  // Atualizar Items - Inserindo a resposta de cada um
  // Pegar taskId -> para cada taskItem, salvar uma response
  // const taskId = formResponsePush.id
  const responseTaskItems = formResponsePush.taskItemResponseFormProps
  await Promise.all(
    responseTaskItems
      .map(async responseTaskItem => {
        await taskItemResponseRepo.pushResponse({
          id: 0,
          answer: responseTaskItem.taskItemResponse.answer,
          letter: responseTaskItem.taskItemResponse.letter,
          taskItemId: responseTaskItem.taskItemResponse.taskItemId,
          studentId: student.id
        })
      })
  )
}

export const serverGetFormAsweredByIdService = async (classSubjectId: number, taskId: number, userId: number): Promise<ConfigFormPushProps> => {
  const { taskItems, startline, ...formData } = await serverGetResponseFormByIdServices(classSubjectId, taskId, userId)
  return {
    ...formData,
    startline,
    taskItems: taskItems.map(({ text, ...taskItem }) => ({
      ...taskItem,
      text: ''
    }))
  }
}

export const serverGetResponseFormByIdServices = async (classSubjectId: number, taskId: number, userId: number) => {
  const classSubjectRepo = new ClassRoomSubjectRepository()
  const studentRepo = new StudentRepository()
  const classSubject = await classSubjectRepo.findById(classSubjectId)
  if (!classSubject) { throw new Error('Matéria não registrada') }
  if (!classSubject?.classRoomId) { throw new Error('Turma informada não registrada') }
  const { classRoomId } = classSubject

  // Pegar StudentId
  // select student by classroom e user id
  const student = await studentRepo.findByUserClassRoom(userId, classRoomId)
  if (!student) { throw new Error('Estudante não registrado') }

  // const classSubjectId = Number(req.query.id)
  const formData = await new TaskRepository().findResponseById(taskId, student.id)
  if (!formData) throw new Error('Formulário não encontrado')

  const classSubjectInfo = await new ClassRoomSubjectRepository().findTeacherName(classSubjectId)
  if (!classSubjectInfo) { throw new Error('Matéria não registrada') }

  return {
    id: formData.id,
    deadline: formData.deadline.toUTCString(),
    startline: formData.startline.toUTCString(),
    viewAnswer: formData.viewAnswer,
    description: formData.description,
    classSubjectId: classSubjectId,
    teacherName: classSubjectInfo.teacher.user.name,
    subjectName: classSubjectInfo.courseSubject.name,
    taskItems: formData.taskItems
      .map(i => ({
        id: i.id,
        title: i.title,
        isRequireActive: i.isRequireActive,
        typeOptionQuestion: getQuestionTypeString(i.typeOptionQuestion),
        answer: i.answer,
        text: i.text,
        number: i.number,
        points: i.points,
        radioOrCheckOptions: i.taskItemOptions
          .map(i => ({
            id: i.id,
            letter: i.letter,
            description: i.description,
            isCheckedProf: i.isCheckedProf,
            isCheckedStudent: i.isCheckedStudent
          })),
        taskItemImages: i.taskItemImages.map(i => (
          {
            id: i.id,
            base64: i.image
          }
        )),
        taskItemResponseFormProps: i.taskItemResponse
      }))
  }
}
