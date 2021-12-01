import { LoginState } from 'store/reducer/LoginReducer/types'
import { SignupState } from 'store/reducer/SignupReducer/types'

export const loginHandleError = (data: LoginState) => {
  if (!data.user) throw new Error('Usuario não informado')
  if (!data.password) throw new Error('Senha não informada')
}

export const SignupHandleError = (data: SignupState) => {
  if (!data.login) throw new Error('Usuario não informado')
  if (!data.password) throw new Error('Senha não informada')
  if (!data.cpf) throw new Error('CPF não informado')
  if (!data.email) throw new Error('E-mail não informado')
  if (!data.name) throw new Error('Nome não informado')
}
