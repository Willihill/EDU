import { FlexGridDataProps } from 'components/Elements/FlexGrid/types'

import { UserVisualizationType } from 'services/AuthService/types'

import { Teacher, University, User } from '@prisma/client'

export interface UniversityProps extends University {
  userVisualizationType: UserVisualizationType
}

export interface TeacherProps extends Teacher {
  user: User
}

export interface UniversityTeacherInviteListProps extends FlexGridDataProps {
  id: number
  CPF: number
  teacherName: string
  isAccept: boolean
  acceptAt: string
}

export interface UniversityTeacherInvitePushProps {
  CPF: number
}

export interface UniversityTeacherListFilters {
  name: string
}

export interface UniversityTeacherListProps extends FlexGridDataProps {
  id: number
  name: string
}

export interface UniversityTeacherInviteProps {
  token: string
  university: Pick<UniversityProps, 'id' | 'fantasyName'>
}

export interface UniversityAmountProps {
  studentsCount: number
  teachersCount: number
  classRoomsCount: number
}
