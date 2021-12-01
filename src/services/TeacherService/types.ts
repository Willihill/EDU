import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

export interface TeacherClassRoomSubjectListProps extends FlexGridDataProps {
  id: number
  classRoomId: number
  subjectName: string
  courseName: string
}

export interface TeacherMonthClassListProps extends FlexGridDataProps {
  id: number
  weekDayName: string
  date: string
  startAt: string
  endAt: string
  courseName: string
  subjectName: string
}

export interface TeacherTaskListProps extends FlexGridDataProps {
  id: number
  title: string
  startline: string
  deadline: string
  responseCount: number
  courseName: string
  classRoomSubject: {
    id: number
    name: string
  }
  status: number
}
