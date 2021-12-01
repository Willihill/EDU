import React from 'react'

import { NavMenu, SelectUniversity } from 'components/Elements'
import { UserAvatar } from 'components/Widget'

import useConfig from 'hooks/useConfig'

import styles from 'styles/components/Layout/PageLayout/index.module.scss'

import { PageLayoutProps } from './types'

const PageLayout = ({
  children
}: PageLayoutProps) => {
  const {
    userId
  } = useConfig()

  return (
    <>
      <div className={styles.container}>
        <section className={styles.navmenu}>
          <NavMenu />
        </section>

        <section className={styles.content}>
          <div className={styles.contentHeader}>
            <div className={styles.routeMap} />
            <UserAvatar userId={userId} size={25} />
          </div>

          <div className={styles.children}>
            {children}
          </div>
        </section>
      </div>

      <SelectUniversity />
    </>
  )
}

export default PageLayout
