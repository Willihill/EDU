import React from 'react'

import { GetServerSidePropsContext } from 'next'

import { LoadingIndicator } from 'components/Widget'

import { getJwtPayloadService } from 'services/AuthService'
import { UserVisualizationType } from 'services/AuthService/types'
import { NavigationRoutes } from 'services/NavigationService/types'

const HomeBootScreen = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >
    <LoadingIndicator size={100} />
  </div>
)

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { userVisualizationType } = getJwtPayloadService(context)
  context
    .res
    .writeHead(302, {
      Location: userVisualizationType === UserVisualizationType.Admin
        ? NavigationRoutes.AdminHome
        : userVisualizationType === UserVisualizationType.Teacher
          ? NavigationRoutes.TeacherHome
          : NavigationRoutes.StudentHome
    })
    .end()

  return {
    props: {

    }
  }
}

export default HomeBootScreen
