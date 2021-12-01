import { ConfigFormPushProps, SectionProps } from 'services/FormService/types'

import {
  SET_CLASS_SUBJECT_ID,
  SET_FORM,
  RESET_FORM,
  SET_STARTLINE,
  SET_LOADING,
  SET_DEADLINE,
  SET_DESCRIPTION,
  SET_SECTIONS,
  SET_VIEWANSWER
} from './types'

export const setFormClassSubjectIdAction = (payload: number) => ({ type: SET_CLASS_SUBJECT_ID, payload })
export const setFormDeadlineAction = (payload: string) => ({ type: SET_DEADLINE, payload })
export const setFormStartlineAction = (payload: string) => ({ type: SET_STARTLINE, payload })
export const setFormDescriptionAction = (payload: string) => ({ type: SET_DESCRIPTION, payload })
export const setFormSectionsAction = (payload: SectionProps[]) => ({ type: SET_SECTIONS, payload })
export const setFormViewAnswerAction = (payload: boolean) => ({ type: SET_VIEWANSWER, payload })
export const setFormLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })

export const setFormAction = (payload: ConfigFormPushProps) => ({ type: SET_FORM, payload })
export const resetFormAction = () => ({ type: RESET_FORM })
