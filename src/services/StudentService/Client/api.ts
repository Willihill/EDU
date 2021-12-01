import HttpBase from 'services/HttpBase'

import { StudentClassRoomSubjectListProps, StudentMonthClassListProps, StudentTaskListProps } from '../types'

export const getStudentClassRoomSubjectsApi = async () =>
  await HttpBase.get<StudentClassRoomSubjectListProps[]>('/api/ClassRoom/student/subjects')

export const getStudentMonthClassesApi = async () =>
  await HttpBase.get<StudentMonthClassListProps[]>('/api/ClassRoom/student/monthClasses')

export const getStudentTasksApi = async () =>
  await HttpBase.get<StudentTaskListProps[]>('/api/ClassRoom/student/tasks')
