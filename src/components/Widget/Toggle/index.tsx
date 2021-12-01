import React, { memo } from 'react'

import styles from 'styles/components/Widget/Toggle/index.module.scss'

import { ToggleProps, ToggleTheme } from './types'

const Toggle = memo(({
  active,
  theme = ToggleTheme.Green,
  onPressToggle
}: ToggleProps) => (
  <div
    className={styles.container}
    toggle-active={String(active)}
    arial-theme={theme}
    onClick={onPressToggle}
  >
    <div className={styles.slider}>
      <div className={styles.ball} />
    </div>
  </div>
))

export default Toggle
