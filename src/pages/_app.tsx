import '../styles/globals.scss'
import '../styles/fonts.scss'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'

import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'

import { getJwtPayloadService, isUserAuthenticatedService } from 'services/AuthService'
import { jwtPayloadToConfigFactory } from 'services/AuthService/factory'
import { NavigationRoutes } from 'services/NavigationService/types'

import { store } from 'store'
import { setConfigAction } from 'store/reducer/ConfigReducer/actions'

import { updatePortugueseMomentLocale } from 'utils/helpers/Date'

function MyApp ({ Component, pageProps: { configuration, ...pageProps } }: AppProps) {
  useEffect(() => {
    updatePortugueseMomentLocale()
    configuration && store.dispatch(setConfigAction(configuration))
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res, pathname, query } = appContext.ctx
  const { goBack } = query
  const appProps = await App.getInitialProps(appContext)

  if (req && res) {
    const userAutehticated = isUserAuthenticatedService(appContext.ctx)
    let redirectRouter = ''

    if (
      pathname !== '/login' &&
      pathname !== '/signup' &&
      pathname !== '/classroom/invite/[id]' &&
      pathname !== '/teacher/invite/[id]' &&
      !userAutehticated
    ) redirectRouter = NavigationRoutes.Login
    if ((pathname === '/login' || pathname === '/signup') && userAutehticated) redirectRouter = NavigationRoutes.Home

    if (goBack && typeof goBack === 'string') redirectRouter = goBack

    if (redirectRouter) {
      return res
        .writeHead(302, { Location: redirectRouter })
        .end()
    }

    if (userAutehticated) {
      appProps.pageProps.configuration = jwtPayloadToConfigFactory(getJwtPayloadService(appContext.ctx))
    }
  }

  return {
    ...appProps
  }
}

export default MyApp
