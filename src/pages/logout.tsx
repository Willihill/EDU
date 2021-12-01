import React from 'react'

import { serverLogoutUserService } from 'services/AuthService/Server'

const LogoutScreen = () => {
  return (
    <div />
  )
}

export const getServerSideProps = serverLogoutUserService

export default LogoutScreen
