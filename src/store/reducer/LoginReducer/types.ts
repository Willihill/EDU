import { UserAuthProps } from 'services/AuthService/types'

export const SET_USER = 'LoginReducer/SET_USER'
export const SET_PASSWORD = 'LoginReducer/SET_PASSWORD'
export const SET_REMENBER = 'LoginReducer/SET_REMENBER'
export const SET_LOADING = 'LoginReducer/SET_LOADING'
export const RESET_LOGIN = 'LoginReducer/RESET_LOGIN'

export interface LoginState extends UserAuthProps {
  loading: boolean
}
