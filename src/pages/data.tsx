import React from 'react'

import { useUniversities } from 'hooks/University'

import styles from 'styles/pages/Login/index.module.scss'

const DataScreen = () => {
  const {
    data,
    count,
    error,
    isValidating
  } = useUniversities()

  return (
    <div className={styles.container}>
      <pre>
        <label>Count: {count}</label><br />
        <label>Error: {error?.message}</label><br />
        <label>Loading: {isValidating}</label>
      </pre>
    </div>
  )
}

export default DataScreen
