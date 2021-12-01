import React from 'react'

import styles from 'styles/components/Cards/UniversityCard/index.module.scss'

import { UniversityCardProps } from './types'

const UniversityCard = ({
  id,
  userVisualizationType,
  size = 150,
  onPressUniversity
}: UniversityCardProps) => {
  return (
    <div
      className={styles.container}
      style={{
        width: size,
        height: size
      }}
      onClick={onPressUniversity}
    >
      <img
        src={`/assets/images/university/${id}.png`}
        className={styles.image}
      />
      <span className={styles.visualizationType}>{userVisualizationType}</span>
    </div>
  )
}

export default UniversityCard
