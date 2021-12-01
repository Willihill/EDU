import React, { memo } from 'react'

import { ComponentOutsidePress } from 'components/Elements'

import styles from 'styles/components/Forms/InputHour/index.module.scss'

import { hourMask } from 'utils/helpers/String'

import { InputHourProps } from './types'

const InputHour = ({
  label = '',
  required = false,
  disabled = false,
  hour = '',
  onChangeHour
}: InputHourProps) => {
  return (
    <ComponentOutsidePress
      className={styles.container}
      actived={false}
      arial-disabled={String(disabled)}
      onPressOutside={() => {}}
    >
      {label !== '' && <label className={styles.label}>{`${label} ${required ? '*' : ''}`}</label>}
      <div className={styles.content}>
        <input
          type='text'
          className={styles.input}
          value={hourMask(hour)}
          onChange={event => onChangeHour(event.target.value)}
        />
      </div>
    </ComponentOutsidePress>
  )
}

export default memo(InputHour)
