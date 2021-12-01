import React, { memo } from 'react'
import { TiWarning } from 'react-icons/ti'

import styles from 'styles/components/Widget/FetchError/index.module.scss'

import { FetchErrorProps } from './types'

const FetchError = memo(({
  title,
  error,
  sizeIcon = 100,
  sizeTitle = 20,
  sizeError = 12
}: FetchErrorProps) => (
  <div className={styles.container}>
    <TiWarning className={styles.icon} size={sizeIcon} />
    <h1 className={styles.title} style={{ fontSize: sizeTitle }}>{title}</h1>
    {!!error &&
      <span
        className={styles.error}
        arial-scrollbar-theme='blue'
        style={{ fontSize: sizeError }}
      >{error}
      </span>}
  </div>
))

export default FetchError
