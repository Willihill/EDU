import React, { memo } from 'react'
import { IoMdInformationCircle } from 'react-icons/io'

import styles from 'styles/components/Widget/FetchEmpty/index.module.scss'

import { FetchEmptyProps } from './types'

const TITLE_DEFAULT = 'Nenhum registro encontrado'

const FetchEmpty = memo(({
  title = TITLE_DEFAULT,
  sizeIcon = 80,
  sizeTitle = 20
}: FetchEmptyProps) => (
  <div className={styles.container}>
    <IoMdInformationCircle className={styles.icon} size={sizeIcon} />
    <span className={styles.title} style={{ fontSize: sizeTitle }}>{title}</span>
  </div>
))

export default FetchEmpty
