import React from 'react'

import styles from 'styles/components/Elements/TabPage/index.module.scss'

import { TabPageProps } from './types'

const TabPage = ({
  title,
  disabled = false,
  children
}: TabPageProps) => (
  <div key={title} className={styles.container}>
    {children}
  </div>
)

export default TabPage
