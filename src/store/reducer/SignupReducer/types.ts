import { UserSignUpProps } from 'services/AuthService/types'

export const SET_NAME = 'SignupReducer/SET_NAME'
export const SET_PASSWORD = 'SignupReducer/SET_PASSWORD'
export const SET_EMAIL = 'SignupReducer/SET_EMAIL'
export const SET_CPF = 'SignupReducer/SET_CPF'
export const SET_USER = 'SignupReducer/SET_USER'
export const SET_LOADING = 'SignupReducer/SET_LOADING'
export const RESET_SIGNUP = 'SignupReducer/RESET_SIGNUP'

export interface SignupState extends Omit<UserSignUpProps, 'cpf'> {
  loading: boolean
  cpf: string
}
