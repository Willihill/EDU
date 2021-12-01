import { ConfigFormPushProps } from 'services/FormService/types'

export const SET_CLASS_SUBJECT_ID = 'FormReducer/CreateFormReducer/SET_CLASS_SUBJECT_ID'
export const SET_DEADLINE = 'FormReducer/CreateFormReducer/SET_DEADLINE'
export const SET_STARTLINE = 'FormReducer/CreateFormReducer/SET_STARTLINE'
export const SET_DESCRIPTION = 'FormReducer/CreateFormReducer/SET_DESCRIPTION'
export const SET_VIEWANSWER = 'FormReducer/CreateFormReducer/SET_VIEWANSWER'
export const SET_SECTIONS = 'FormReducer/CreateFormReducer/SET_SECTIONS'
export const SET_LOADING = 'FormReducer/CreateFormReducer/SET_LOADING'
export const SET_FORM = 'FormReducer/CreateFormReducer/SET_FORM'
export const RESET_FORM = 'FormReducer/CreateFormReducer/RESET_FORM'

export interface CreateFormState extends ConfigFormPushProps {
  loading: boolean
}
