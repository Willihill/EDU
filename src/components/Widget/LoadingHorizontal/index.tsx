import React, { memo } from 'react'

import styles from 'styles/components/Widget/LoadingHorizontal/index.module.scss'

import { LoadingHorizontalProps, LoadingHorizontalTheme } from './types'

const LoadingHorizontal = ({
  theme = LoadingHorizontalTheme.BlueDark
}: LoadingHorizontalProps) => (
  <div
    className={styles.container}
    arial-theme={theme}
  >
    <div className={styles.content}>
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={styles.square} />
      <div className={styles.square} />
    </div>
  </div>
)

export default memo(LoadingHorizontal)
