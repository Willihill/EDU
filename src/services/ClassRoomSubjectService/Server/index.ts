import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'
import { TokenPayloadProps } from 'services/AuthService/types'

import ClassRoomClassRepository from 'store/prisma/ClassRoomClassRepository'
import ClassRoomSubjectRepository from 'store/prisma/ClassRoomSubjectRepository'
import TaskItemResponseRepository from 'store/prisma/TaskItemResponseRepository'
import TaskRepository from 'store/prisma/TaskRepository'

import { WeekDayList } from 'utils/common/constants'
import { dateHourToDb, dateToDb } from 'utils/helpers/Date'
import { parseNumeric } from 'utils/helpers/Number'

import { ClassRoomSubjectClassProps, ClassRoomSubjectDataProps, ClassRoomSubjectMessageProps, ClassRoomSubjectMessagePushProps, ClassRoomSubjectTaskProps } from '../types'

export const serverGetClassRoomSubjectDataService = async (classRoomSubjectId: number, { currentUniversityId }: TokenPayloadProps): Promise<ClassRoomSubjectDataProps> => {
  const classRoomSubject = await new ClassRoomSubjectRepository().findByIdUniversity(classRoomSubjectId, currentUniversityId)
  if (!classRoomSubject) throw new Error('Matéria inválida')

  return {
    id: classRoomSubjectId,
    name: classRoomSubject.courseSubject.name,
    teacherName: classRoomSubject.teacher.user.name
  }
}

export const serverGetClassRoomSubjectMessagesService = async (req: NextApiRequest): Promise<ClassRoomSubjectMessageProps[]> => {
  const classRoomSubjectId = parseNumeric(req.query.id as string)
  const { userId } = getJwtPayloadService({ req })

  const classRoomSubjectMessages = await new ClassRoomSubjectRepository().findMessages(classRoomSubjectId)
  if (!classRoomSubjectMessages) throw new Error('Matéria inválida')

  return classRoomSubjectMessages.map(message => ({
    message: message.message,
    sendAt: dateHourToDb(message.sendAt),
    user: {
      id: message.user.id,
      name: message.user.name
    },
    isLoggedUser: message.userId === userId
  }))
}

export const serverPushClassRoomSubjectMessageService = async (req: NextApiRequest) => {
  const classRoomSubjectId = parseNumeric(req.query.id as string)
  const { userId } = getJwtPayloadService({ req })

  const { message } = req.body as ClassRoomSubjectMessagePushProps

  await new ClassRoomSubjectRepository().pushMessage({
    message,
    classRoomSubjectId,
    sendAt: new Date(),
    userId
  })
}

export const serverGetClassRoomSubjectClassesService = async (req: NextApiRequest): Promise<ClassRoomSubjectClassProps[]> => {
  const classRoomSubjectId = parseNumeric(req.query.id as string)

  const classRoomSubjectClasses = await new ClassRoomClassRepository().findByClassRoomSubject(classRoomSubjectId)

  return classRoomSubjectClasses.map(item => ({
    id: item.id,
    date: dateToDb(item.date),
    weekDayName: WeekDayList[item.weekDay],
    startAt: item.startAt,
    endAt: item.endAt
  }))
}

export const serverGetClassRoomSubjectTasksService = async (req: NextApiRequest): Promise<ClassRoomSubjectTaskProps[]> => {
  const classRoomSubjectId = parseNumeric(req.query.id as string)
  const { userId } = getJwtPayloadService({ req })

  const classRoomSubjectTasks = await new TaskRepository().findByClassRoomSubject(classRoomSubjectId)

  return await Promise.all(
    classRoomSubjectTasks.map(async item => {
      const responseCount = await new TaskItemResponseRepository().findUserResponseByTask(userId, item.id)

      return {
        id: item.id,
        title: item.description,
        startline: dateToDb(item.startline),
        deadline: dateToDb(item.deadline),
        isDone: responseCount > 0,
        canViewResult: item.viewAnswer
      }
    })
  )
}
