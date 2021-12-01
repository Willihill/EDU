import { Course, CourseSubject } from '.prisma/client'

import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

export interface CourseListFilters {
  name?: string
}

export interface CourseListProps extends FlexGridDataProps {
  id: number
  name: string
  duration: number
}

export interface CourseSubjectListProps extends FlexGridDataProps {
  id: number
  name: string
}

export interface CourseDataProps extends Course {
}

export interface CoursePushSubjectProps extends Omit<CourseSubject, 'courseId'>, FlexGridDataProps {
}

export interface CoursePushProps {
  id: number
  name: string
  duration: number
  subjects: CoursePushSubjectProps[]
}
