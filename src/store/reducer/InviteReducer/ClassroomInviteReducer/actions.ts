import { ClassroomInviteTokenProps } from 'services/ClassRoomService/types'

import {
  SET_INVITE_DATA,
  SET_LOADING
} from './types'

export const setClassrromInviteDataAction = (payload: ClassroomInviteTokenProps) => ({ type: SET_INVITE_DATA, payload })
export const setClassrromInviteLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })
