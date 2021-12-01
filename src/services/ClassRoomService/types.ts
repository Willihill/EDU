import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

import { CourseDataProps } from 'services/CourseService/types'
import { UniversityProps } from 'services/UniversityService/types'

import { CommonDataProps } from 'utils/common/types'

export interface ClassRoomListProps extends FlexGridDataProps {
  id: number
  code: string
  courseName: string
  coordinatorName: string
  startDate: string
}

export interface ClassRoomPushSubjectProps extends FlexGridDataProps {
  id: number
  semester: number
  courseSubject: CommonDataProps
  teacher: CommonDataProps
}

export interface ClassRoomPushCalendarWeekDayClassProps {
  id: number
  courseSubject: CommonDataProps
  startAt: string
  endAt: string
}

export interface ClassRoomPushCalendarWeekDayProps {
  date: string
  weekDay: number
  classes: ClassRoomPushCalendarWeekDayClassProps[]
}

export interface ClassRoomPushCalendarWeekProps extends FlexGridDataProps {
  weekNumber: number
  sunday: ClassRoomPushCalendarWeekDayProps
  monday: ClassRoomPushCalendarWeekDayProps
  tuesday: ClassRoomPushCalendarWeekDayProps
  wednesday: ClassRoomPushCalendarWeekDayProps
  thursday: ClassRoomPushCalendarWeekDayProps
  friday: ClassRoomPushCalendarWeekDayProps
  saturday: ClassRoomPushCalendarWeekDayProps
}

export interface ClassRoomStudentInviteProps extends FlexGridDataProps {
  id: number
  CPF: number
  student: {
    id: number
    name: string
  }
  acceptAt: string
  isAccepted: boolean
}

export interface ClassRoomPushProps {
  id: number
  code: string
  startDate: string
  courseDuration: number
  classToken: string
  coordinator: CommonDataProps
  course: CommonDataProps
  subjects: ClassRoomPushSubjectProps[]
  calendarWeeks: ClassRoomPushCalendarWeekProps[]
  studentInvitees: ClassRoomStudentInviteProps[]
}

export interface ClassroomInviteTokenProps {
  token: string
  course: Pick<CourseDataProps, 'id' | 'name'>
  university: Pick<UniversityProps, 'id' | 'fantasyName'>
}
