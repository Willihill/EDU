import { FlexGridColumnComponent, FlexGridColumnProps } from 'components/Elements/FlexGrid/types'

import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

import { RootState } from 'store/reducer'
import { setTeacherInviteLoadingAction } from 'store/reducer/InviteReducer/TeacherInviteReducer/actions'

import { Dispatch } from 'redux'
import { parseNumeric } from 'utils/helpers/Number'
import { asyncPromise } from 'utils/helpers/Promise'
import { cpfMask } from 'utils/helpers/String'
import { validaCpf } from 'utils/validation'

import { UniversityTeacherInviteListProps, UniversityTeacherListProps } from '../types'
import { deleteUniversityTeacherInvitedApi, postUniversityTeacherInviteApi, postUniversityTeacherInvitedApi } from './api'

export const submitTeacherInviteService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { token } = getState().TeacherInviteReducer

    try {
      dispatch(setTeacherInviteLoadingAction(true))
      const { err } = await asyncPromise(postUniversityTeacherInviteApi(token))

      if (err) throw new Error(err.response?.data.message)
      alert('VOCÊ AGORA FAZ PARTE DA universidade')

      NavigationService.navigateToRoute(NavigationRoutes.Home)
    } catch (error: any) {
      alert(error.message ?? 'Erro ao entrar na universidade.')
    } finally {
      dispatch(setTeacherInviteLoadingAction(false))
    }
  }

export const pushUniversityTeacherInviteService = async (CPF: string, successCallback: () => void) => {
  try {
    if (!validaCpf(CPF)) throw new Error('CPF inválido.')

    const { err } = await asyncPromise(postUniversityTeacherInvitedApi({
      CPF: parseNumeric(CPF)
    }))

    if (err) throw new Error(err.response?.data.message)

    successCallback()
  } catch (error: any) {
    alert(error.message)
  }
}

export const removeUniversityTeacherInviteService = async ({ id, isAccept }: UniversityTeacherInviteListProps, successCallback: () => void) => {
  try {
    if (isAccept) throw new Error('Não é possível remover um invite já aceito.')

    const { err } = await asyncPromise(deleteUniversityTeacherInvitedApi(id))
    if (err) throw new Error(err.response?.data.message)

    successCallback()
  } catch (error: any) {
    alert(error.message)
  }
}

export const generateAdminTeacherConsultColumns = (): Array<FlexGridColumnProps<UniversityTeacherListProps>> => [
  {
    label: 'Nome',
    key: 'name',
    orderable: true
  }
]

export const generateAdminTeachersInvitedConsultColumns = (component: FlexGridColumnComponent<UniversityTeacherInviteListProps>): Array<FlexGridColumnProps<UniversityTeacherInviteListProps>> => [
  {
    label: 'CPF',
    key: 'CPF',
    orderable: true,
    transform: data => cpfMask(data.toString().padStart(11, '0'))
  },
  {
    label: 'Professor',
    key: 'teacherName',
    orderable: true
  },
  {
    label: 'Aceito em',
    key: 'acceptAt',
    orderable: true
  },
  {
    label: '',
    key: 'id',
    width: 110,
    fixed: true,
    component: component
  }
]
