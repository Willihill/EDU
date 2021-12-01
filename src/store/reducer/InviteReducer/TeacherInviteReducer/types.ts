import { UniversityTeacherInviteProps } from 'services/UniversityService/types'

export const SET_INVITE_DATA = 'TeacherInviteReducer/SET_INVITE_DATA'
export const SET_LOADING = 'TeacherInviteReducer/SET_LOADING'

export interface TeacherInviteState extends UniversityTeacherInviteProps {
  loading: boolean
}
