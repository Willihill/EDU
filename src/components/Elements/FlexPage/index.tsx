import React from 'react'

import styles from 'styles/components/Elements/FlexPage/index.module.scss'

import { FlexPageProps } from './types'

const FlexPage = ({
  children
}: FlexPageProps) => (
  <div className={styles.page_container}>
    {children}
  </div>
)

export default FlexPage
