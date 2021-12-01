export interface UserAuthProps {
  user: string
  password: string
  remenber: boolean
}

export enum UserVisualizationType {
  Empty = '',
  Student = 'Aluno',
  Teacher = 'Professor',
  Admin = 'Administrador'
}

export interface TokenPayloadProps extends Omit<UserAuthProps, 'password'> {
  iat?: number
  exp?: number
  userId: number
  currentUniversityId: number
  currentUniversityToken: string
  userVisualizationType: UserVisualizationType
}

export interface UserSignUpProps {
  login: string
  password: string
  name: string
  email: string
  cpf: number
}
