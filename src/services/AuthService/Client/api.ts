import HttpBase from 'services/HttpBase'
import { UniversityProps } from 'services/UniversityService/types'

import { UserAuthProps, UserSignUpProps } from '../types'

export const postAuthLoginApi = async (body: UserAuthProps) =>
  await HttpBase.post('/api/Auth/login', body)

export const postSignupApi = async (body: UserSignUpProps) =>
  await HttpBase.post('/api/Auth/signUp', body)

export const postAuthChangeUniversityApi = async (data: UniversityProps) =>
  await HttpBase.post('/api/Auth/changeUniversity', data)
