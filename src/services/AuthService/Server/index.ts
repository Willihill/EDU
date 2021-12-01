import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

import { UniversityProps } from 'services/UniversityService/types'

import { setCookieStore } from 'store/cookie'
import { CookieKeys } from 'store/cookie/types'
import UniversityRepository from 'store/prisma/UniversityRepository'
import UserRepository from 'store/prisma/UserRepository'

import jwt from 'jsonwebtoken'

import { userAuthToTokenPayloadFactory } from '../factory'
import { TokenPayloadProps, UserAuthProps, UserSignUpProps } from '../types'

import { Prisma } from '@prisma/client'

import { getJwtPayloadService } from '..'

export const serverAuthenticateUserService = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const { user, password }: UserAuthProps = body

  const userFind = await new UserRepository().getUserByLogin(user)

  if (!userFind) throw new Error('Usuario/senha inválido.')
  if (userFind.password !== password) throw new Error('Usuario/senha inválido.')

  const token = generateAuthTokenService(userAuthToTokenPayloadFactory(body, userFind.id))
  setCookieStore(CookieKeys.Token, token, { res })
}

export const serverLogoutUserService = (context: GetServerSidePropsContext) => {
  setCookieStore(CookieKeys.Token, '', context)
}

export const serverChangeUniversityService = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: universityId, userVisualizationType } = req.body as UniversityProps

  if (!universityId) throw new Error('Universidade não informada')

  const universityRepo = new UniversityRepository()
  const university = await universityRepo.findById(universityId)
  if (!university) throw new Error('Universidade não encontrada')

  const { exp, ...currentPayload } = getJwtPayloadService({ req })
  const token = generateAuthTokenService({
    ...currentPayload,
    currentUniversityId: universityId,
    currentUniversityToken: university.token,
    userVisualizationType: userVisualizationType
  })

  setCookieStore(CookieKeys.Token, token, { res })
}

export const generateAuthTokenService = (payload: TokenPayloadProps): string => {
  return jwt.sign(payload, process.env.SECRET_KEY ?? '', { expiresIn: 3600 })
}

export const signUpUserService = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const newUser: UserSignUpProps = body

  try {
    const { id } = await new UserRepository().createUser(newUser)

    const token = generateAuthTokenService(userAuthToTokenPayloadFactory(body, id))
    setCookieStore(CookieKeys.Token, token, { res })
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error(await getUniqueViolation(newUser))
      }
    }
    throw new Error(error.message)
  }
}

export const getUniqueViolation = async (newUser: UserSignUpProps) => {
  const existingUsers = await new UserRepository().validateCreateUser(newUser)
  if (existingUsers) {
    const existingUser = existingUsers[0]
    if (existingUser.login === newUser.login) { return 'Login já registrado' }
    if (existingUser.cpf === newUser.cpf) { return 'CPF já registrado' }
    if (existingUser.email === newUser.email) { return 'Email já registrado' }
  }
}
