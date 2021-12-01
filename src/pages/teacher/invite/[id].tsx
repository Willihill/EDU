import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { InviteLayout } from 'components/Layout'

import { useTeacherInvite } from 'hooks/Invite'

import { serverGetUniversityTeacherInviteDataService } from 'services/UniversityService/Server'
import { UniversityTeacherInviteProps } from 'services/UniversityService/types'

import styles from 'styles/pages/Invite/index.module.scss'

const TeacherInviteScreen = (inviteData: UniversityTeacherInviteProps) => {
  const {
    university,
    loading,
    setTeacherInviteData,
    onPressAcceptInvite
  } = useTeacherInvite()

  useEffect(() => {
    inviteData && setTeacherInviteData(inviteData)
  }, [])

  return (
    <div className={styles.container}>
      <InviteLayout
        title={university.fantasyName}
        description='Clique no botão abaixo para vincular-se à universidade.'
        urlImage={`/assets/images/university/${university.id}.png`}
        loadingAccept={loading}
        onPressAccept={onPressAcceptInvite}
      />
    </div>
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const classroomInviteData = await serverGetUniversityTeacherInviteDataService(query.id as string)

  return {
    props: classroomInviteData
  }
}

export default TeacherInviteScreen
