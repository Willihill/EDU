import React from 'react'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

import { useRouter } from 'next/router'

import { Button } from 'components/Forms'
import { UserAvatar } from 'components/Widget'

import useConfig from 'hooks/useConfig'

import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

import styles from 'styles/components/Layout/InviteLayout/index.module.scss'

import { InviteLayoutProps } from './types'

const InviteLayout = ({
  title,
  description,
  urlImage,
  loadingAccept,
  onPressAccept
}: InviteLayoutProps) => {
  const {
    userId,
    isAuthenticated
  } = useConfig()

  const {
    asPath
  } = useRouter()

  const onPressAccount = async () => await NavigationService.navigateToRoute(NavigationRoutes.Login, `?goBack=${asPath}`)

  return (

    <div className={styles.container}>
      <img src='/assets/images/logo-vertical.svg' className={styles.logo} />
      <div className={styles.invite}>
        <div className={styles.images}>
          <img src='/assets/images/cadastroUser/Vector-3.svg' className={styles.vector} />
          {isAuthenticated && (
            <>
              <UserAvatar userId={userId} />
              <MdOutlineArrowForwardIos />
            </>
          )}
          <img src={urlImage} className={styles.imgUniversity} />
        </div>

        <h1 className={styles.title}>{title}</h1>
        <span className={styles.description}>{description}</span>

        {isAuthenticated
          ? <Button
              label='Aceitar'
              loading={loadingAccept}
              onPress={onPressAccept}
            />
          : <Button
              label='Acessar conta'
              onPress={onPressAccount}
            />}
      </div>
    </div>
  )
}

export default InviteLayout
