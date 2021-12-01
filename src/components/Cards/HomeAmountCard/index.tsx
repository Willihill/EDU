import React from 'react'
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'
import { SiGoogleclassroom } from 'react-icons/si'

import styles from 'styles/components/Cards/HomeAmountCard/index.module.scss'

import { HomeAmountCardIcon, HomeAmountCardProps } from './types'

const getIcon = (icon: HomeAmountCardIcon) =>
  icon === HomeAmountCardIcon.Studant
    ? <FaUserGraduate className={styles.icon} />
    : icon === HomeAmountCardIcon.Teacher
      ? <FaChalkboardTeacher className={styles.icon} />
      : <SiGoogleclassroom className={styles.icon} />

const HomeAmountCard = ({
  title,
  icon,
  amount
}: HomeAmountCardProps) => (
  <div className={styles.container}>
    <div className={styles.lineIcon}>
      {getIcon(icon)}
    </div>
    <div className={styles.lineInfo}>
      <span className={styles.title}>{title}</span>
      <h1 className={styles.amount}>{amount}</h1>
    </div>
  </div>
)

export default HomeAmountCard
