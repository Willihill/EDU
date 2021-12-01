import React, { memo } from 'react'

import styles from 'styles/components/Widget/UserAvatar/index.module.scss'

import { UserAvatarProps } from './types'

const UserAvatar = memo(({
  userId,
  size = 60
}: UserAvatarProps) => (
  <div
    className={styles.container}
    style={{
      width: size,
      height: size
    }}
  >
    <img src={`/assets/images/avatar/${userId}.png`} />
  </div>
))

export default UserAvatar
