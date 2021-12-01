import React from 'react'

import styles from 'styles/components/Elements/templateFormResult/templateAnswer/index.module.scss'

import { AnswerProps } from './types'

const TmpAnswerForm = ({
  children
}: AnswerProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.divWrongCicle}>
        {/* <img src='/assets/test1/wrong.png' className={styles.imageWrong} /> */}
        {children}
      </div>
    </div>
  )
}

export default TmpAnswerForm
