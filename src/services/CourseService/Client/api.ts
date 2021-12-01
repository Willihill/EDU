import HttpBase from 'services/HttpBase'

import { CourseListFilters, CourseListProps, CoursePushProps, CourseSubjectListProps } from '../types'

export const getCoursesApi = async (filters: CourseListFilters) =>
  await HttpBase.get<CourseListProps[]>('/api/Course/list', { params: filters })

export const getCourseSubjectsApi = async (courseId: number) =>
  await HttpBase.get<CourseSubjectListProps[]>(`/api/Course/${courseId}/subjects`)

export const postCourseApi = async (data: CoursePushProps) =>
  await HttpBase.post('/api/Course/push', data)
