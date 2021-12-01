import { ActionType } from 'utils/common/types'

import {
  CoursePushState,
  SET_NAME,
  SET_DURATION,
  SET_NEW_SUBJECT_NAME,
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  SET_LOADING,
  SET_DATA,
  RESET_DATA
} from './types'

const initialState: CoursePushState = {
  id: 0,
  name: '',
  duration: 0,
  newSubjectName: '',
  subjects: [],
  loading: false
}

const LoginReducer = (state: CoursePushState = initialState, { type, payload }: ActionType): CoursePushState => {
  switch (type) {
    case SET_NAME:
      return { ...state, name: payload }
    case SET_DURATION:
      return { ...state, duration: payload }
    case SET_NEW_SUBJECT_NAME:
      return { ...state, newSubjectName: payload }
    case ADD_SUBJECT:
      return { ...state, subjects: [...state.subjects, { id: 0, name: state.newSubjectName }], newSubjectName: '' }
    case REMOVE_SUBJECT:
      return { ...state, subjects: state.subjects.filter((i, idx) => idx !== payload) }
    case SET_LOADING:
      return { ...state, loading: payload }
    case SET_DATA:
      return { ...state, ...payload }
    case RESET_DATA:
      return initialState
    default:
      return state
  }
}

export default LoginReducer
