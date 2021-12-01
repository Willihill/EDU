import { TokenPayloadProps } from 'services/AuthService/types'

export const SET_USER = 'ConfigReducer/SET_USER'
export const SET_CONFIG = 'ConfigReducer/SET_CONFIG'
export const RESET_CONFIG = 'ConfigReducer/RESET_CONFIG'

export interface ConfigState extends TokenPayloadProps {

}
