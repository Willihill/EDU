import { ActionType } from 'utils/common/types'

import {
  SignupState,
  SET_USER,
  SET_NAME,
  SET_PASSWORD,
  SET_EMAIL,
  SET_CPF,
  RESET_SIGNUP
} from './types'

export const initialState: SignupState = {
  login: '',
  password: '',
  name: '',
  cpf: '',
  email: '',
  loading: false
}

const SignupReducer = (state: SignupState = initialState, { type, payload }: ActionType): SignupState => {
  switch (type) {
    case SET_USER:
      return { ...state, login: payload }
    case SET_PASSWORD:
      return { ...state, password: payload }
    case SET_NAME:
      return { ...state, name: payload }
    case SET_EMAIL:
      return { ...state, email: payload }
    case SET_CPF:
      return { ...state, cpf: payload }
    case RESET_SIGNUP:
      return initialState
    default:
      return state
  }
}

export default SignupReducer
