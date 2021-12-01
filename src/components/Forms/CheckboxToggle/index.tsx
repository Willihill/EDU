import React, { memo } from 'react'

import { Toggle } from 'components/Widget'

import styles from 'styles/components/Forms/CheckboxToggle/index.module.scss'

import { CheckboxToggleProps } from './types'

const CheckboxToggle = ({
  label,
  ...props
}: CheckboxToggleProps) => (
  <div className={styles.container}>
    <div className={styles.toggle}>
      <Toggle {...props} />
      {(!!label && label !== '') && <span className={styles.label}>{label}</span>}
    </div>
  </div>
)

export default memo(CheckboxToggle)
