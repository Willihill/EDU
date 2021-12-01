import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

export interface ClassRoomSubjectDataProps {
  id: number
  name: string
  teacherName: string
}

export interface ClassRoomSubjectMessageProps {
  message: string
  sendAt: string
  user: {
    id: number
    name: string
  }
  isLoggedUser: boolean
}

export interface ClassRoomSubjectMessagePushProps {
  message: string
}

export interface ClassRoomSubjectClassProps extends FlexGridDataProps {
  id: number
  date: string
  weekDayName: string
  startAt: string
  endAt: string
}

export interface ClassRoomSubjectTaskProps extends FlexGridDataProps {
  id: number
  title: string
  startline: string
  deadline: string
  isDone: boolean
  canViewResult: boolean
}
