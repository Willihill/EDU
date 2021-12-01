import { getCookieStore } from 'store/cookie'
import { CookieKeys } from 'store/cookie/types'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const NO_RESPONSE_INTERNAL_API_ERROR = 'Sem resposta da Api. Entre em contato com o suporte!'

const responseSuccess = (response: any) => response

const responseError = async (error: AxiosError) => {
  let err: AxiosError = error
  let message = error.response?.data?.message ?? NO_RESPONSE_INTERNAL_API_ERROR

  if (error.response?.status === 401) message = 'Token expirado. Refaça o login.'

  err = Object.assign(error, { response: { ...error.response, data: { message } } })

  if (err.response?.status === 401 || err.response?.status === 403) {
    // NotificationManager.error('Faça o login novamente', 'Credenciais expiraram', 5000)
    // FEATURE TODO: REDIRECT TO LOGGOUT USER
  }

  return await Promise.reject(err)
}

const requestSuccess = async (config: AxiosRequestConfig) => config

export const setBearerToken = (token: string) => {
  console.log('setBearerToken', token)
  HttpBase.defaults.headers.common = { Authorization: `Bearer ${token}` }
}

const HttpBase = axios.create()

console.log('Coockie no HttpBase:', getCookieStore(CookieKeys.Token, undefined))

HttpBase.interceptors.request.use(requestSuccess)
HttpBase.interceptors.response.use(responseSuccess, responseError)

export default HttpBase
