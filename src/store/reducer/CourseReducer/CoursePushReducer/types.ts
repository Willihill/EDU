import { CoursePushProps } from 'services/CourseService/types'

export const SET_NAME = 'CoursePushReducer/SET_NAME'
export const SET_DURATION = 'CoursePushReducer/SET_DURATION'

export const SET_NEW_SUBJECT_NAME = 'CoursePushReducer/SET_NEW_SUBJECT_NAME'
export const ADD_SUBJECT = 'CoursePushReducer/ADD_SUBJECT'
export const REMOVE_SUBJECT = 'CoursePushReducer/REMOVE_SUBJECT'

export const SET_LOADING = 'CoursePushReducer/SET_LOADING'

export const SET_DATA = 'CoursePushReducer/SET_DATA'
export const RESET_DATA = 'CoursePushReducer/RESET_DATA'

export interface CoursePushState extends CoursePushProps {
  newSubjectName: string
  loading: boolean
}
