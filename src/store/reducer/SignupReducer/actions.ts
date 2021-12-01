import {
  SET_NAME,
  SET_PASSWORD,
  SET_EMAIL,
  SET_CPF,
  SET_USER,
  SET_LOADING,
  RESET_SIGNUP
} from './types'

export const setSignupNameAction = (payload: string) => ({ type: SET_NAME, payload })
export const setSignupCpfAction = (payload: number) => ({ type: SET_CPF, payload })
export const setSignupEmailAction = (payload: string) => ({ type: SET_EMAIL, payload })
export const setSignupPasswordAction = (payload: string) => ({ type: SET_PASSWORD, payload })
export const setSignupUserAction = (payload: string) => ({ type: SET_USER, payload })
export const setSignupLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })

export const resetCadastroAction = () => ({ type: RESET_SIGNUP })
