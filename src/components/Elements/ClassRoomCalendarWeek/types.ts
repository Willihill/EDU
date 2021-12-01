import { ClassRoomPushCalendarWeekDayClassProps, ClassRoomPushCalendarWeekDayProps, ClassRoomPushCalendarWeekProps, ClassRoomPushSubjectProps } from 'services/ClassRoomService/types'

export interface ClassRoomCalendarWeekProps extends ClassRoomPushCalendarWeekProps {
  onPressDuplicate: () => void
  onPressAddClassSundayWeekDay: () => void
  onChangeClassRoomSubjectSundayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourSundayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourSundayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveSundayWeekDayClass: (weekDayClassIndex: number) => void

  onPressAddClassMondayWeekDay: () => void
  onChangeClassRoomSubjectMondayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourMondayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourMondayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveMondayWeekDayClass: (weekDayClassIndex: number) => void

  onPressAddClassTuesdayWeekDay: () => void
  onChangeClassRoomSubjectTuesdayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourTuesdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourTuesdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveTuesdayWeekDayClass: (weekDayClassIndex: number) => void

  onPressAddClassWednesdayWeekDay: () => void
  onChangeClassRoomSubjectWednesdayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourWednesdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourWednesdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveWednesdayWeekDayClass: (weekDayClassIndex: number) => void

  onPressAddClassThursdayWeekDay: () => void
  onChangeClassRoomSubjectThursdayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourThursdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourThursdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveThursdayWeekDayClass: (weekDayClassIndex: number) => void

  onPressAddClassFridayWeekDay: () => void
  onChangeClassRoomSubjectFridayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourFridayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourFridayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveFridayWeekDayClass: (weekDayClassIndex: number) => void

  onPressAddClassSaturdayWeekDay: () => void
  onChangeClassRoomSubjectSaturdayWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourSaturdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourSaturdayWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveSaturdayWeekDayClass: (weekDayClassIndex: number) => void
}

export interface ClassRoomCalendarWeekDayProps extends ClassRoomPushCalendarWeekDayProps {
  onPressAddClass: () => void
  onChangeClassRoomSubjectWeekDayClass: (value: ClassRoomPushSubjectProps, weekDayClassIndex: number) => void
  onChangeStartHourWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onChangeEndHourWeekDayClass: (value: string, weekDayClassIndex: number) => void
  onPressRemoveWeekDayClass: (weekDayClassIndex: number) => void
}

export interface ClassRoomCalendarWeekDayClassProps extends ClassRoomPushCalendarWeekDayClassProps {
  onChangeClassRoomSubject: (value: ClassRoomPushSubjectProps) => void
  onChangeStartHour: (value: string) => void
  onChangeEndHour: (value: string) => void
  onPressRemove: () => void
}
