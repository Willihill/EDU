import { ClassroomInviteTokenProps } from 'services/ClassRoomService/types'

export const SET_INVITE_DATA = 'ClassroomInviteReducer/SET_INVITE_DATA'
export const SET_LOADING = 'ClassroomInviteReducer/SET_LOADING'

export interface ClassrromInviteState extends ClassroomInviteTokenProps {
  loading: boolean
}
