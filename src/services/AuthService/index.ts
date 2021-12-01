import { getCookieStore, parseCookieContext } from 'store/cookie'
import { CookieKeys } from 'store/cookie/types'

import jwtDecode from 'jwt-decode'

import { TokenPayloadProps } from './types'

export const isUserAuthenticatedService = (ctx?: parseCookieContext): boolean => {
  const token = getCookieStore(CookieKeys.Token, ctx)
  return !!token
}

export const getJwtPayloadService = (ctx?: parseCookieContext): TokenPayloadProps => {
  return jwtDecode<TokenPayloadProps>(getCookieStore(CookieKeys.Token, ctx) ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.2Xfku0C3MFMUjsfWddfbXpJ89DwapbE4PmJTMpzpx1w')
}
