import React, { useEffect } from 'react'

import { GetServerSidePropsContext } from 'next'

import { InviteLayout } from 'components/Layout'

import { useClassroomInvite } from 'hooks/Invite'

import { serverGetClassroomInviteDataService } from 'services/ClassRoomService/Server'
import { ClassroomInviteTokenProps } from 'services/ClassRoomService/types'

import styles from 'styles/pages/Invite/index.module.scss'

const StudentInviteScreen = (classRoomInviteData: ClassroomInviteTokenProps) => {
  const {
    course,
    university,
    loading,
    setClassroomInviteData,
    onPressAcceptInvite
  } = useClassroomInvite()

  useEffect(() => {
    classRoomInviteData && setClassroomInviteData(classRoomInviteData)
  }, [])

  return (
    <div className={styles.container}>
      <InviteLayout
        title={course.name}
        description='Clique no botão abaixo para entra na turma.'
        urlImage={`/assets/images/university/${university.id}.png`}
        loadingAccept={loading}
        onPressAccept={onPressAcceptInvite}
      />
    </div>
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const classroomInviteData = await serverGetClassroomInviteDataService(query.id as string)

  return {
    props: classroomInviteData
  }
}

export default StudentInviteScreen
