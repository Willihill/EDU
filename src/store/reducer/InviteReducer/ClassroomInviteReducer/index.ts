import { ActionType } from 'utils/common/types'

import {
  ClassrromInviteState,
  SET_INVITE_DATA,
  SET_LOADING
} from './types'

const initialState: ClassrromInviteState = {
  token: '',
  course: {
    id: 0,
    name: ''
  },
  university: {
    id: 0,
    fantasyName: ''
  },
  loading: false
}

const InviteReducer = (state: ClassrromInviteState = initialState, { type, payload }: ActionType): ClassrromInviteState => {
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
