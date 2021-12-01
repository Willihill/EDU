import { UniversityTeacherInviteProps } from 'services/UniversityService/types'

import {
  SET_INVITE_DATA,
  SET_LOADING
} from './types'

export const setTeacherInviteDataAction = (payload: UniversityTeacherInviteProps) => ({ type: SET_INVITE_DATA, payload })
export const setTeacherInviteLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })
