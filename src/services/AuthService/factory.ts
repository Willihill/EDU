import { ConfigState } from 'store/reducer/ConfigReducer/types'
import { SignupState } from 'store/reducer/SignupReducer/types'

import { cpfRemoveCaracter } from 'utils/helpers/String'

import { TokenPayloadProps, UserAuthProps, UserSignUpProps, UserVisualizationType } from './types'

export const jwtPayloadToConfigFactory = (payload: TokenPayloadProps): ConfigState => ({
  ...payload
})

export const userAuthToTokenPayloadFactory = (data: UserAuthProps, userId: number): TokenPayloadProps => ({
  userId: userId,
  user: data.user,
  remenber: data.remenber,
  currentUniversityId: 0,
  currentUniversityToken: '',
  userVisualizationType: UserVisualizationType.Empty
})

export const userSignUpReducerToApiFactory = (data: SignupState): UserSignUpProps => ({
  name: data.name,
  cpf: Number(cpfRemoveCaracter(data.cpf)),
  email: data.email,
  login: data.login,
  password: data.password
})
