import { CommonDataProps } from 'utils/common/types'

import { TeacherProps, UniversityTeacherListProps } from './types'

export const teacherToListFactory = (data: TeacherProps): UniversityTeacherListProps => ({
  id: data.id,
  name: data.user.name,
  isActive: true,
  isEditable: true,
  isExcluding: false
})

export const universityTeacherListToCommonDataFactory = (data: UniversityTeacherListProps): CommonDataProps => ({
  id: data.id,
  name: data.name
})
