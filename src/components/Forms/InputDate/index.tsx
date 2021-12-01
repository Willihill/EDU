import React, { memo, useState } from 'react'

import { ComponentOutsidePress, FlexCalendar } from 'components/Elements'

import styles from 'styles/components/Forms/InputDate/index.module.scss'

import { dateToInput } from 'utils/helpers/Date'

import { InputDateProps } from './types'

const InputDate = ({
  label = '',
  required = false,
  disabled = false,
  date,
  ...calendarProps
}: InputDateProps) => {
  const [calendarVisible, setCalendarVisible] = useState(false)
  const onPressOpenCalendar = () => setCalendarVisible(true)
  const onPressCloseCalendar = () => setCalendarVisible(false)

  return (
    <ComponentOutsidePress
      className={styles.container}
      actived={calendarVisible}
      arial-disabled={String(disabled)}
      onPressOutside={onPressCloseCalendar}
    >
      {label !== '' && <label className={styles.label} onClick={onPressOpenCalendar}>{`${label} ${required ? '*' : ''}`}</label>}
      <div className={styles.content}>
        <input
          type='text'
          className={styles.input}
          readOnly
          value={dateToInput(date)}
          onClick={onPressOpenCalendar}
        />
      </div>

      <FlexCalendar
        visible={calendarVisible}
        date={date}
        {...calendarProps}
      />
    </ComponentOutsidePress>
  )
}

export default memo(InputDate)
