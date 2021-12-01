import Router from 'next/router'

import { createUrlParams } from 'utils/common'

import { NavigationParamProps, NavigationRoutes } from './types'

const buildQueryParams = (params: NavigationParamProps = '') => {
  let query: string = ''

  if (typeof params === 'object') query = `?${createUrlParams(params)}`
  else query = String(params)

  return query
}

const navigateToBack = () => Router.back()

const navigateToRoute = async (route: NavigationRoutes, params: NavigationParamProps = '') => await Router.push(`${route}${buildQueryParams(params)}`)

const navigateToTab = (route: NavigationRoutes, params: NavigationParamProps = '') => window.open(`${route}${buildQueryParams(params)}`, '_blank')

const reload = () => Router.reload()

export default {
  navigateToBack,
  navigateToRoute,
  navigateToTab,
  reload
}
