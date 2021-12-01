import { CommonDataEmpty } from 'utils/common/constants'
import { ActionType } from 'utils/common/types'
import { dateToDb } from 'utils/helpers/Date'

import {
  ClassRoomPushState,
  SET_CODE,
  SET_START_DATE,
  SET_COURSE,
  SET_COURSE_DURATION,
  SET_COORDINATOR,
  ADD_SUBJECT,
  SET_SUBJECT_KEY_DATA,
  CLEAN_SUBJECT,
  ADD_CALENDAR_WEEK,
  ADD_CALENDAR_WEEK_DAY_CLASS,
  SET_CALENDAR_WEEK_DAY_CLASS_INFO,
  REMOVE_CALENDAR_WEEK_DAY_CLASS,
  ADD_STUDENT_INVITE,
  REMOVE_STUDENT_INVITE,
  SET_LOADING,
  SET_DATA,
  RESET_DATA
} from './types'

const initialState: ClassRoomPushState = {
  id: 0,
  code: '',
  startDate: dateToDb(new Date()),
  classToken: '',
  course: CommonDataEmpty,
  courseDuration: 0,
  coordinator: CommonDataEmpty,
  subjects: [],
  calendarWeeks: [],
  studentInvitees: [],
  loading: false
}

const LoginReducer = (state: ClassRoomPushState = initialState, { type, payload }: ActionType): ClassRoomPushState => {
  switch (type) {
    case SET_CODE:
      return { ...state, code: payload }
    case SET_START_DATE:
      return { ...state, startDate: payload }
    case SET_COURSE:
      return { ...state, course: payload }
    case SET_COURSE_DURATION:
      return { ...state, courseDuration: payload }
    case SET_COORDINATOR:
      return { ...state, coordinator: payload }
    case ADD_SUBJECT:
      return { ...state, subjects: [...state.subjects, payload] }
    case CLEAN_SUBJECT:
      return { ...state, subjects: initialState.subjects }
    case SET_SUBJECT_KEY_DATA:
      return { ...state, subjects: state.subjects.map((i, idx) => idx === payload.subjectIndex ? { ...i, [payload.key]: payload.value } : i) }
    case ADD_CALENDAR_WEEK:
      return { ...state, calendarWeeks: [...state.calendarWeeks, payload] }
    case ADD_CALENDAR_WEEK_DAY_CLASS:
      return {
        ...state,
        calendarWeeks: state.calendarWeeks
          .map((i, idx) => idx !== payload.index
            ? i
            : {
                ...i,
                [payload.weekDayKey]: {
                  ...i[payload.weekDayKey],
                  classes: [...i[payload.weekDayKey].classes, { id: 0, courseSubject: CommonDataEmpty, startAt: '', endAt: '' }]
                }
              })
      }
    case SET_CALENDAR_WEEK_DAY_CLASS_INFO:
      return {
        ...state,
        calendarWeeks: state.calendarWeeks
          .map((i, idx) => idx !== payload.index
            ? i
            : {
                ...i,
                [payload.weekDayKey]: {
                  ...i[payload.weekDayKey],
                  classes: i[payload.weekDayKey].classes.map((f, _idx) => _idx !== payload.weekDayClassIndex ? f : { ...f, [payload.weekDayClassKey]: payload.value })
                }
              })
      }
    case REMOVE_CALENDAR_WEEK_DAY_CLASS:
      return {
        ...state,
        calendarWeeks: state.calendarWeeks
          .map((i, idx) => idx !== payload.index
            ? i
            : {
                ...i,
                [payload.weekDayKey]: {
                  ...i[payload.weekDayKey],
                  classes: i[payload.weekDayKey].classes.filter((f, _idx) => _idx !== payload.weekDayClassIndex)
                }
              })
      }

    case ADD_STUDENT_INVITE:
      return { ...state, studentInvitees: [...state.studentInvitees, { id: 0, CPF: payload, acceptAt: '', isAccepted: false, student: { id: 0, name: '' } }] }
    case REMOVE_STUDENT_INVITE:
      return { ...state, studentInvitees: state.studentInvitees.filter((i, idx) => idx !== payload) }
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
