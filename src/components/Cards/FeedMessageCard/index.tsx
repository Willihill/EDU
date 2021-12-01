import React from 'react'

import { UserAvatar } from 'components/Widget'

import styles from 'styles/components/Cards/FeedMessageCard/index.module.scss'

import { dateHourToInput } from 'utils/helpers/Date'

import { FeedMessageCardProps } from './types'

const FeedMessageCard = ({
  message,
  sendAt,
  user
}: FeedMessageCardProps) => (
  <div className={styles.container}>
    <div className={styles.owner}>
      <UserAvatar
        userId={user.id}
        size={40}
      />

      <div className={styles.ownerInfo}>
        <span className={styles.ownerName}>{user.name}</span>
        <span className={styles.sendAt}>{dateHourToInput(sendAt)}</span>
      </div>
    </div>
    <p className={styles.message}>{message}</p>
  </div>
)

export default FeedMessageCard
