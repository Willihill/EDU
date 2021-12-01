import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

import { ClassRoomSubjectTaskProps } from 'services/ClassRoomSubjectService/types'

export interface StudentClassRoomSubjectListProps extends FlexGridDataProps {
  id: number
  classRoomId: number
  subjectName: string
  teacherName: string
}

export interface StudentMonthClassListProps extends FlexGridDataProps {
  id: number
  weekDayName: string
  date: string
  startAt: string
  endAt: string
  subjectName: string
  teacherName: string
}

export interface StudentTaskListProps extends ClassRoomSubjectTaskProps {
  classRoomSubject: {
    id: number
    name: string
  }
  teacherName: string
  status: number
}
