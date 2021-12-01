import { ClassRoomPushProps } from 'services/ClassRoomService/types'

export const SET_CODE = 'ClassRoomPushReducer/SET_CODE'
export const SET_START_DATE = 'ClassRoomPushReducer/SET_START_DATE'
export const SET_COURSE = 'ClassRoomPushReducer/SET_COURSE'
export const SET_COURSE_DURATION = 'ClassRoomPushReducer/SET_COURSE_DURATION'
export const SET_COORDINATOR = 'ClassRoomPushReducer/SET_COORDINATOR'

export const ADD_SUBJECT = 'ClassRoomPushReducer/ADD_SUBJECT'
export const SET_SUBJECT_KEY_DATA = 'ClassRoomPushReducer/SET_SUBJECT_KEY_DATA'
export const CLEAN_SUBJECT = 'ClassRoomPushReducer/CLEAN_SUBJECT'

export const ADD_CALENDAR_WEEK = 'ClassRoomPushReducer/ADD_CALENDAR_WEEK'
export const ADD_CALENDAR_WEEK_DAY_CLASS = 'ClassRoomPushReducer/ADD_CALENDAR_WEEK_DAY_CLASS'
export const SET_CALENDAR_WEEK_DAY_CLASS_INFO = 'ClassRoomPushReducer/SET_CALENDAR_WEEK_DAY_CLASS_INFO'
export const REMOVE_CALENDAR_WEEK_DAY_CLASS = 'ClassRoomPushReducer/REMOVE_CALENDAR_WEEK_DAY_CLASS'

export const ADD_STUDENT_INVITE = 'ClassRoomPushReducer/ADD_STUDENT_INVITE'
export const REMOVE_STUDENT_INVITE = 'ClassRoomPushReducer/REMOVE_STUDENT_INVITE'

export const SET_LOADING = 'ClassRoomPushReducer/SET_LOADING'

export const SET_DATA = 'ClassRoomPushReducer/SET_DATA'
export const RESET_DATA = 'ClassRoomPushReducer/RESET_DATA'

export type CalendarWeekDays = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export type CalendarWeekDayClassKeys = 'courseSubject' | 'startAt' | 'endAt'

export interface ClassRoomPushState extends ClassRoomPushProps {
  loading: boolean
}
