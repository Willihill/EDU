import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

import { Request, Response } from 'express'
import { setCookie, parseCookies } from 'nookies'

import { CookieKeys } from './types'

const PREFIX_COOKIE = 'EDU@'

export type parseCookieContext = Pick<NextPageContext, 'req'> | {
  req: NextApiRequest
} | {
  req: Request
} | null | undefined

export type setCookieContext =Pick<NextPageContext, 'res'> | {
  res: NextApiResponse
} | {
  res: Response
} | null | undefined

const buildCookieKey = (key: CookieKeys) => `${PREFIX_COOKIE}${key}`

export const getCookieStore = (key: CookieKeys, ctx: parseCookieContext) => {
  const cookies = parseCookies(ctx)
  return cookies[buildCookieKey(key)]
}

export const setCookieStore = (key: CookieKeys, value: string, ctx?: setCookieContext) => {
  setCookie(ctx, buildCookieKey(key), value, {
    // secure: true,
    maxAge: 60 * 60 * 8,
    path: '/',
    httpOnly: !!ctx,
    sameSite: true
  })
}
