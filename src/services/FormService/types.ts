import { Task, TaskItem } from '.prisma/client'

export interface SectionRadioOrCheckProps {
  id: number
  letter: string
  description: string
  isCheckedProf: boolean
  isCheckedStudent: boolean | null
}

export interface TaskItemImage {
  id: number
  base64: string
}

export type OptionQuestionType = 'radio' | 'checkbox' | 'shortResp' | 'paragraph'

export interface SectionProps {
  id: number
  title: string
  isRequireActive: boolean
  isImageSelected?: boolean
  typeOptionQuestion: OptionQuestionType
  radioOrCheckOptions: SectionRadioOrCheckProps[]
  answerQuestion?: string[]
  text: string
  number: number
  taskItemImages: TaskItemImage[]
  points: number
  answer: string
}

export interface ConfigForm {
  id: number
  classRoomId: number
  viewAnswer: boolean
  deadline: string
  description: string
  startline: string
  taskItems: SectionProps[]
}

export interface QuestionResponseFormProps {
  id: number
  letter: string[]
  answer: string
}

export interface ConfigFormDataProps extends Task{
}

export interface QuestionFormPushProps extends Omit<TaskItem, 'taskId'>{
}

export interface ConfigFormPushProps {
  id: number
  viewAnswer: boolean
  classSubjectId: number
  teacherName: string
  subjectName: string
  deadline: string
  startline: string
  description: string
  taskItems: SectionProps[]
}

// export interface ConfigFormResponsePushProps {

export interface TaskItemResponse {
  answer: string | null
  taskItemId: number
  letter: string | null
}

// Formulário de resposta
export interface ConfigResponseFormPushProps extends Pick<ConfigFormPushProps, 'id' > {
  taskItemResponseFormProps: TaskItemResponseFormProps[]
}

// Questões do Formulário de resposta
export interface TaskItemResponseFormProps extends Pick<SectionProps, 'id'> {
  taskItemResponse: TaskItemResponse
}

export interface TaskItemResponseFormDataProps extends Pick<TaskItem, 'id' | 'taskId'> {
}
