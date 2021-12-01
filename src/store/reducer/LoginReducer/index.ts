import { ActionType } from 'utils/common/types'

import {
  LoginState,
  SET_REMENBER,
  SET_USER,
  SET_PASSWORD,
  SET_LOADING,
  RESET_LOGIN
} from './types'

export const initialState: LoginState = {
  user: '',
  password: '',
  remenber: false,
  loading: false
}

const LoginReducer = (state: LoginState = initialState, { type, payload }: ActionType): LoginState => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload }
    case SET_PASSWORD:
      return { ...state, password: payload }
    case SET_REMENBER:
      return { ...state, remenber: payload }
    case SET_LOADING:
      return { ...state, loading: payload }
    case RESET_LOGIN:
      return initialState
    default:
      return state
  }
}

export default LoginReducer
