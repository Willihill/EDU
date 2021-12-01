import { CoursePushProps } from 'services/CourseService/types'

import {
  SET_NAME,
  SET_DURATION,
  SET_NEW_SUBJECT_NAME,
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  SET_LOADING,
  SET_DATA,
  RESET_DATA
} from './types'

export const setCoursePushNameAction = (payload: string) => ({ type: SET_NAME, payload })
export const setCoursePushDurationAction = (payload: number) => ({ type: SET_DURATION, payload })

export const setCoursePushNewSubjectNameAction = (payload: string) => ({ type: SET_NEW_SUBJECT_NAME, payload })
export const addCoursePushSubjectAction = () => ({ type: ADD_SUBJECT })
export const removeCoursePushSubjectAction = (payload: number) => ({ type: REMOVE_SUBJECT, payload })

export const setCoursePushLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })

export const setCoursePushDataAction = (payload: CoursePushProps) => ({ type: SET_DATA, payload })
export const resetCoursePushAction = () => ({ type: RESET_DATA })
