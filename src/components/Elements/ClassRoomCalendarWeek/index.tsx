import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoDuplicate } from 'react-icons/io5'

import { InputHour, Select } from 'components/Forms'
import { RowActions } from 'components/Widget'

import { useAdminClassRoomPushSubjects } from 'hooks/ClassRoom/Admin'

import styles from 'styles/components/Elements/ClassRoomCalendarWeek/index.module.scss'

import { WeekDayList } from 'utils/common/constants'
import { dateToInput } from 'utils/helpers/Date'

import { ClassRoomCalendarWeekDayClassProps, ClassRoomCalendarWeekDayProps, ClassRoomCalendarWeekProps } from './types'

const ClassRoomCalendarWeekDayClass = ({
  courseSubject,
  startAt,
  endAt,
  onChangeClassRoomSubject,
  onChangeStartHour,
  onChangeEndHour,
  onPressRemove
}: ClassRoomCalendarWeekDayClassProps) => (
  <div className={styles.classContainer}>
    <Select.Fetch
      required
      rowKey='id'
      hookFetchData={useAdminClassRoomPushSubjects}
      selectedItem={courseSubject.name}
      renderItem={item => <Select.Row description={item.courseSubject.name} isSelected={courseSubject.id === item.courseSubject.id} />}
      onPressItem={onChangeClassRoomSubject}
    />

    <div>
      <InputHour
        hour={startAt}
        onChangeHour={onChangeStartHour}
      />
    </div>

    <div>
      <InputHour
        hour={endAt}
        onChangeHour={onChangeEndHour}
      />
    </div>

    <RowActions onPressRemove={onPressRemove} />
  </div>
)

const ClassRoomCalendarWeekDay = ({
  date,
  weekDay,
  classes,
  onPressAddClass,
  onChangeClassRoomSubjectWeekDayClass,
  onChangeStartHourWeekDayClass,
  onChangeEndHourWeekDayClass,
  onPressRemoveWeekDayClass
}: ClassRoomCalendarWeekDayProps) => (
  <div className={styles.dayContainer}>
    <div className={styles.dayHeader}>
      <span className={styles.dayName}>{WeekDayList[weekDay]}</span>
      <span className={styles.date}>{dateToInput(date)}</span>
      <FiPlus
        className={styles.addClassIcon}
        title='Adicionar aula'
        onClick={onPressAddClass}
      />
    </div>

    <div className={styles.classes}>
      {classes.map((i, idx) => (
        <ClassRoomCalendarWeekDayClass
          key={idx.toString()}
          {...i}
          onChangeClassRoomSubject={value => onChangeClassRoomSubjectWeekDayClass(value, idx)}
          onChangeStartHour={value => onChangeStartHourWeekDayClass(value, idx)}
          onChangeEndHour={value => onChangeEndHourWeekDayClass(value, idx)}
          onPressRemove={() => onPressRemoveWeekDayClass(idx)}
        />
      ))}
    </div>
  </div>
)

const ClassRoomCalendarWeek = ({
  weekNumber,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  onPressDuplicate,

  onPressAddClassSundayWeekDay,
  onChangeClassRoomSubjectSundayWeekDayClass,
  onChangeStartHourSundayWeekDayClass,
  onChangeEndHourSundayWeekDayClass,
  onPressRemoveSundayWeekDayClass,

  onPressAddClassMondayWeekDay,
  onChangeClassRoomSubjectMondayWeekDayClass,
  onChangeStartHourMondayWeekDayClass,
  onChangeEndHourMondayWeekDayClass,
  onPressRemoveMondayWeekDayClass,

  onPressAddClassTuesdayWeekDay,
  onChangeClassRoomSubjectTuesdayWeekDayClass,
  onChangeStartHourTuesdayWeekDayClass,
  onChangeEndHourTuesdayWeekDayClass,
  onPressRemoveTuesdayWeekDayClass,

  onPressAddClassWednesdayWeekDay,
  onChangeClassRoomSubjectWednesdayWeekDayClass,
  onChangeStartHourWednesdayWeekDayClass,
  onChangeEndHourWednesdayWeekDayClass,
  onPressRemoveWednesdayWeekDayClass,

  onPressAddClassThursdayWeekDay,
  onChangeClassRoomSubjectThursdayWeekDayClass,
  onChangeStartHourThursdayWeekDayClass,
  onChangeEndHourThursdayWeekDayClass,
  onPressRemoveThursdayWeekDayClass,

  onPressAddClassFridayWeekDay,
  onChangeClassRoomSubjectFridayWeekDayClass,
  onChangeStartHourFridayWeekDayClass,
  onChangeEndHourFridayWeekDayClass,
  onPressRemoveFridayWeekDayClass,

  onPressAddClassSaturdayWeekDay,
  onChangeClassRoomSubjectSaturdayWeekDayClass,
  onChangeStartHourSaturdayWeekDayClass,
  onChangeEndHourSaturdayWeekDayClass,
  onPressRemoveSaturdayWeekDayClass
}: ClassRoomCalendarWeekProps) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <IoDuplicate
        className={styles.icon}
        title='Duplicar semana'
        onClick={onPressDuplicate}
      />
      <h1 className={styles.title}>Semana {weekNumber}</h1>
    </div>

    <div
      className={styles.days}
      arial-scrollbar-theme='blue'
    >
      <ClassRoomCalendarWeekDay
        {...sunday}
        onPressAddClass={onPressAddClassSundayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectSundayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourSundayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourSundayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveSundayWeekDayClass}
      />

      <ClassRoomCalendarWeekDay
        {...monday}
        onPressAddClass={onPressAddClassMondayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectMondayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourMondayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourMondayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveMondayWeekDayClass}
      />

      <ClassRoomCalendarWeekDay
        {...tuesday}
        onPressAddClass={onPressAddClassTuesdayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectTuesdayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourTuesdayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourTuesdayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveTuesdayWeekDayClass}
      />

      <ClassRoomCalendarWeekDay
        {...wednesday}
        onPressAddClass={onPressAddClassWednesdayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectWednesdayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourWednesdayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourWednesdayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveWednesdayWeekDayClass}
      />

      <ClassRoomCalendarWeekDay
        {...thursday}
        onPressAddClass={onPressAddClassThursdayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectThursdayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourThursdayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourThursdayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveThursdayWeekDayClass}
      />

      <ClassRoomCalendarWeekDay
        {...friday}
        onPressAddClass={onPressAddClassFridayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectFridayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourFridayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourFridayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveFridayWeekDayClass}
      />

      <ClassRoomCalendarWeekDay
        {...saturday}
        onPressAddClass={onPressAddClassSaturdayWeekDay}
        onChangeClassRoomSubjectWeekDayClass={onChangeClassRoomSubjectSaturdayWeekDayClass}
        onChangeStartHourWeekDayClass={onChangeStartHourSaturdayWeekDayClass}
        onChangeEndHourWeekDayClass={onChangeEndHourSaturdayWeekDayClass}
        onPressRemoveWeekDayClass={onPressRemoveSaturdayWeekDayClass}
      />
    </div>
  </div>
)

export default ClassRoomCalendarWeek
