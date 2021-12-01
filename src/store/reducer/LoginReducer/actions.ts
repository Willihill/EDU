import {
  SET_USER,
  SET_PASSWORD,
  SET_REMENBER,
  SET_LOADING,
  RESET_LOGIN
} from './types'

export const setLoginUserAction = (payload: string) => ({ type: SET_USER, payload })
export const setLoginPasswordAction = (payload: string) => ({ type: SET_PASSWORD, payload })
export const setLoginRemenberAction = (payload: boolean) => ({ type: SET_REMENBER, payload })
export const setLoginLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })

export const resetLoginAction = () => ({ type: RESET_LOGIN })
