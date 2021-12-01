import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'
import { UniversityProps } from 'services/UniversityService/types'

import { RootState } from 'store/reducer'
import { setLoginLoadingAction } from 'store/reducer/LoginReducer/actions'
import { setSignupLoadingAction } from 'store/reducer/SignupReducer/actions'

import { Dispatch } from 'redux'
import { asyncPromise } from 'utils/helpers/Promise'

import { userSignUpReducerToApiFactory } from '../factory'
import { postAuthLoginApi, postSignupApi, postAuthChangeUniversityApi } from './api'
import { loginHandleError, SignupHandleError } from './error'

export const submitLoginService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { LoginReducer } = getState()
    dispatch(setLoginLoadingAction(true))

    try {
      loginHandleError(LoginReducer)

      const { err } = await asyncPromise(postAuthLoginApi(LoginReducer))

      if (err) throw new Error(err.response?.data.message)
      alert('LOGADO COM SUCESSO')

      setTimeout(() => NavigationService.reload(), 300)
    } catch (error: any) {
      alert(error.message ?? 'Erro ao realizar login.')
    } finally {
      dispatch(setLoginLoadingAction(false))
    }
  }

export const submitSignupService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { SignupReducer } = getState()
    dispatch(setSignupLoadingAction(true))

    try {
      SignupHandleError(SignupReducer)

      const { err } = await asyncPromise(postSignupApi(userSignUpReducerToApiFactory(SignupReducer)))

      if (err) throw new Error(err.response?.data.message)
      alert('CADASTRADO COM SUCESSO')
      setTimeout(() => NavigationService.reload(), 300)
    } catch (error: any) {
      alert(error.message ?? 'Erro ao realizar cadastro.')
    } finally {
      dispatch(setSignupLoadingAction(false))
    }
  }

export const changeCurrentUniversityService = async (university: UniversityProps) => {
  try {
    const { err } = await asyncPromise(postAuthChangeUniversityApi(university))
    if (err) throw new Error(err.response?.data.message)

    NavigationService.navigateToRoute(NavigationRoutes.Home)
  } catch (error: any) {
    alert(error.message)
  }
}
