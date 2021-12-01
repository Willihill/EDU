import { ActionType } from 'utils/common/types'

import {
  CreateFormState,
  SET_CLASS_SUBJECT_ID,
  SET_DEADLINE,
  SET_STARTLINE,
  SET_DESCRIPTION,
  SET_SECTIONS,
  SET_VIEWANSWER,
  SET_FORM,
  SET_LOADING,
  RESET_FORM
} from './types'

export const initialState: CreateFormState = {
  id: 0,
  classSubjectId: 0,
  deadline: '2021-12-28',
  startline: '2021-11-28',
  description: '',
  taskItems: [],
  viewAnswer: false,
  loading: false
}

const CreateFormReducer = (state: CreateFormState = initialState, { type, payload }: ActionType): CreateFormState => {
  switch (type) {
    case SET_CLASS_SUBJECT_ID:
      return { ...state, classSubjectId: payload }
    case SET_DEADLINE:
      return { ...state, deadline: payload }
    case SET_STARTLINE:
      return { ...state, startline: payload }
    case SET_DESCRIPTION:
      return { ...state, description: payload }
    case SET_SECTIONS:
      return { ...state, taskItems: payload }
    case SET_VIEWANSWER:
      return { ...state, viewAnswer: payload }
    case SET_LOADING:
      return { ...state, loading: payload }
    case SET_FORM:
      return { ...state, ...payload }
    case RESET_FORM:
      return initialState
    default:
      return state
  }
}

export default CreateFormReducer
