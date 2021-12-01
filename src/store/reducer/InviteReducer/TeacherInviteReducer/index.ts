import { ActionType } from 'utils/common/types'

import {
  TeacherInviteState,
  SET_INVITE_DATA,
  SET_LOADING
} from './types'

const initialState: TeacherInviteState = {
  token: '',
  university: {
    id: 0,
    fantasyName: ''
  },
  loading: false
}

const InviteReducer = (state: TeacherInviteState = initialState, { type, payload }: ActionType): TeacherInviteState => {
  switch (type) {
    case SET_INVITE_DATA:
      return { ...state, ...payload }
    case SET_LOADING:
      return { ...state, loading: payload }
    default:
      return state
  }
}

export default InviteReducer
