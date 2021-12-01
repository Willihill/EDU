import { ClassRoom } from '.prisma/client'

import { ClassRoomPushState } from 'store/reducer/ClassRoomReducer/ClassRoomPushReducer/types'

import { CommonDataProps } from 'utils/common/types'
import { dateClone } from 'utils/helpers/Date'

import { ClassRoomPushProps, ClassRoomPushSubjectProps } from './types'

export const classRoomStateToPushPropsFactory = (data: ClassRoomPushState): ClassRoomPushProps => ({
  id: data.id,
  code: data.code,
  startDate: data.startDate,
  courseDuration: data.courseDuration,
  course: data.course,
  coordinator: data.coordinator,
  classToken: data.classToken,
  subjects: data.subjects,
  calendarWeeks: data.calendarWeeks,
  studentInvitees: data.studentInvitees
})

export const classRoomPushToRepoFactory = (data: ClassRoomPushProps): ClassRoom => ({
  id: data.id,
  classToken: '',
  code: data.code,
  startDate: dateClone(data.startDate) ?? new Date(),
  courseId: data.course.id,
  coordinatorId: data.coordinator.id
})

export const classRoomPushSubjectToCommonDataFactory = (data: ClassRoomPushSubjectProps): CommonDataProps => ({
  id: data.courseSubject.id,
  name: data.courseSubject.name
})
