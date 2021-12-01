import React, { memo } from 'react'

import styles from 'styles/components/Widget/LoadingIndicator/index.module.scss'

import { LoadingIndicatorProps, LoadingIndicatorTheme } from './types'

export default memo(({
  theme = LoadingIndicatorTheme.BlueDark,
  speed = 1.2,
  size = 17
}: LoadingIndicatorProps) => (
  <div
    className={styles.loader}
    arial-theme={theme}
    style={{
      animationDuration: `${speed}s`,
      width: size,
      height: size,
      borderWidth: Math.round(size / 10)
    }}
  />
))
