import { NextApiRequest, NextApiResponse } from 'next'

import { Prisma } from '@prisma/client'
import { asyncPromiseSimple } from 'utils/helpers/Promise'

const NO_RESPONSE_API_ERROR = 'Sem resposta da Api de serviço. Entre em contato com o suporte!'
const INTERNAL_SERVER_ERROR = 'Erro de comunicação interna. Entre em contato com o suporte!'

export const createServerResponseError = (error?: string, messageDefault?: string) => ({
  message: error ?? messageDefault
})

export const serverApiResponse = <T>(serverService: (req: NextApiRequest, res: NextApiResponse) => Promise<T>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const apiResp = {
      status: 200,
      data: {}
    }

    try {
      // setBearerToken(getCookieStore('token', { req }))
      const { err, resp } = await asyncPromiseSimple(serverService(req, res))

      if (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) console.log(`[PrismaError] ${err.message}`, err)

        const errorMessage = err instanceof Prisma.PrismaClientKnownRequestError
          ? INTERNAL_SERVER_ERROR
          : err.message

        apiResp.status = 400
        apiResp.data = createServerResponseError(errorMessage, NO_RESPONSE_API_ERROR)
      } else if (resp) {
        apiResp.status = 200
        apiResp.data = resp
      }
    } catch (error) {
      apiResp.status = 400
      apiResp.data = createServerResponseError(INTERNAL_SERVER_ERROR)
    } finally {
      res
        .status(apiResp.status)
        .json(apiResp.data)
    }
  }

export const factoryDataAdapter = <T, U>(data: T | T[], transformerFactory: (data: T) => U): U | U[] => {
  if (!Array.isArray(data)) return transformerFactory(data)

  const dataArray: U[] = []
  data.map(item => dataArray.push(transformerFactory(item)))
  return dataArray
}
