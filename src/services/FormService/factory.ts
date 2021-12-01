import { CreateFormState } from 'store/reducer/FormReducer/CreateFormReducer/types'

import { ConfigFormPushProps, ConfigResponseFormPushProps } from './types'

export const formCreateStateToFormPushFactory = (data: CreateFormState): ConfigFormPushProps => ({
  id: data.id,
  classSubjectId: data.classSubjectId,
  deadline: data.deadline,
  startline: data.deadline,
  description: data.description,
  viewAnswer: data.viewAnswer,
  taskItems: data.taskItems,
  subjectName: data.subjectName,
  teacherName: data.teacherName
})

export const formResponseStateToFormPushFactory = (data: CreateFormState): ConfigResponseFormPushProps => ({
  id: data.id,
  taskItemResponseFormProps: data.taskItems.map(i => ({
    id: i.id,
    taskItemResponse: {
      taskItemId: i.id,
      answer: i.answer,
      letter: i.radioOrCheckOptions
        .filter(option => option.isCheckedStudent && (option.letter))
        .map(j => j.letter).join(',')
    }
  }))
})
