import HttpBase from 'services/HttpBase'

import { TeacherClassRoomSubjectListProps, TeacherMonthClassListProps, TeacherTaskListProps } from '../types'

export const getTeacherClassRoomSubjectsApi = async () =>
  await HttpBase.get<TeacherClassRoomSubjectListProps[]>('/api/ClassRoom/teacher/subjects')

export const getTeacherMonthClassesApi = async () =>
  await HttpBase.get<TeacherMonthClassListProps[]>('/api/ClassRoom/teacher/monthClasses')

export const getTeacherTasksApi = async () =>
  await HttpBase.get<TeacherTaskListProps[]>('/api/ClassRoom/teacher/tasks')
