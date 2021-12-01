import { ClassRoomPushCalendarWeekDayClassProps, ClassRoomPushCalendarWeekProps, ClassRoomPushProps, ClassRoomPushSubjectProps } from 'services/ClassRoomService/types'

import { CommonDataProps } from 'utils/common/types'

import {
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
  RESET_DATA,
  CalendarWeekDays,
  CalendarWeekDayClassKeys
} from './types'

export const setClassRoomPushCodeAction = (payload: string) => ({ type: SET_CODE, payload })
export const setClassRoomPushStartDateAction = (payload: string) => ({ type: SET_START_DATE, payload })
export const setClassRoomPushCourseAction = (payload: CommonDataProps) => ({ type: SET_COURSE, payload })
export const setClassRoomPushCourseDurationAction = (payload: number) => ({ type: SET_COURSE_DURATION, payload })
export const setClassRoomPushCoordinatorAction = (payload: CommonDataProps) => ({ type: SET_COORDINATOR, payload })

export const addClassRoomPushSubjectAction = (payload: ClassRoomPushSubjectProps) => ({ type: ADD_SUBJECT, payload })
export const setClassRoomPushSubjectKeyDataAction = <T extends ClassRoomPushSubjectProps, K extends keyof T>(subjectIndex: number, key: K, value: T[K]) => ({ type: SET_SUBJECT_KEY_DATA, payload: { subjectIndex, key, value } })
export const cleanClassRoomPushSubjectsAction = () => ({ type: CLEAN_SUBJECT })

export const addClassRoomPushCalendarWeekAction = (payload: ClassRoomPushCalendarWeekProps) => ({ type: ADD_CALENDAR_WEEK, payload })
export const addClassRoomPushCalendarWeekDayClassAction = (weekIndex: number, weekDay: CalendarWeekDays) => ({ type: ADD_CALENDAR_WEEK_DAY_CLASS, payload: { index: weekIndex, weekDayKey: weekDay } })
export const setClassRoomPushCalendarWeekDayClassInfoAction = (weekIndex: number, weekDay: CalendarWeekDays, weekDayClassIndex: number, weekDayClassKey: CalendarWeekDayClassKeys, value: ClassRoomPushCalendarWeekDayClassProps[CalendarWeekDayClassKeys]) => ({ type: SET_CALENDAR_WEEK_DAY_CLASS_INFO, payload: { index: weekIndex, weekDayKey: weekDay, weekDayClassIndex, weekDayClassKey, value } })
export const removeClassRoomPushCalendarWeekDayClassAction = (weekIndex: number, weekDay: CalendarWeekDays, weekDayClassIndex: number) => ({ type: REMOVE_CALENDAR_WEEK_DAY_CLASS, payload: { index: weekIndex, weekDayKey: weekDay, weekDayClassIndex } })

export const addClassRoomPushStudentInviteAction = (payload: number) => ({ type: ADD_STUDENT_INVITE, payload })
export const removeClassRoomPushStudentInviteAction = (payload: number) => ({ type: REMOVE_STUDENT_INVITE, payload })

export const setClassRoomPushLoadingAction = (payload: boolean) => ({ type: SET_LOADING, payload })

export const setClassRoomPushDataAction = (payload: ClassRoomPushProps) => ({ type: SET_DATA, payload })
export const resetClassRoomPushAction = () => ({ type: RESET_DATA })
