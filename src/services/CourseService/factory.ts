import { ClassRoomPushSubjectProps } from 'services/ClassRoomService/types'

import { CoursePushState } from 'store/reducer/CourseReducer/CoursePushReducer/types'

import { Course, CourseSubject } from '@prisma/client'

import { CourseListProps, CoursePushProps, CourseSubjectListProps } from './types'

export const coursePropsToListFactory = (data: Course): CourseListProps => ({
  id: data.id,
  name: data.name,
  duration: data.duration,
  isActive: true,
  isEditable: true,
  isExcluding: false
})

export const coursePushStateToPushPropsFactory = (data: CoursePushState): CoursePushProps => ({
  id: data.id,
  name: data.name,
  duration: data.duration,
  subjects: data.subjects
})

export const courseSubjectToListFactory = (data: CourseSubject): CourseSubjectListProps => ({
  id: data.id,
  name: data.name,
  isActive: true,
  isEditable: true,
  isExcluding: false
})

export const courseSubjectListToClassRoomPushSubjectFactory = (data: CourseSubjectListProps): ClassRoomPushSubjectProps => ({
  id: 0,
  courseSubject: {
    id: data.id,
    name: data.name
  },
  semester: 1,
  teacher: {
    id: 0,
    name: ''
  }
})
