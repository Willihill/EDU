import Router from 'next/router'

import NavigationService from 'services/NavigationService'

import { RootState } from 'store/reducer'
import { setFormLoadingAction } from 'store/reducer/FormReducer/CreateFormReducer/actions'

import { Dispatch } from 'redux'
import { asyncPromise } from 'utils/helpers/Promise'

import { formCreateStateToFormPushFactory, formResponseStateToFormPushFactory } from '../factory'
import { postCreateFormApi, postResponseFormApi } from './api'

export const submitCreateFormService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const CreateFormReducer = getState().CreateFormReducer

    try {
      dispatch(setFormLoadingAction(true))
      const { err } = await asyncPromise(postCreateFormApi(CreateFormReducer.classSubjectId, formCreateStateToFormPushFactory(CreateFormReducer)))

      if (err) throw new Error(err.response?.data.message)
      alert('FORMULÁRIO CRIADO COM SUCESSO')

      NavigationService.navigateToBack()
    } catch (error: any) {
      alert(error.message ?? 'Erro ao criar formulário.')
    } finally {
      dispatch(setFormLoadingAction(false))
    }
  }

export const submitResponseFormService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const CreateFormReducer = getState().CreateFormReducer

    try {
      dispatch(setFormLoadingAction(true))
      console.log(CreateFormReducer, formCreateStateToFormPushFactory(CreateFormReducer))
      const { err } = await asyncPromise(postResponseFormApi(CreateFormReducer.classSubjectId, CreateFormReducer.id, formResponseStateToFormPushFactory(CreateFormReducer)))

      if (err) throw new Error(err.response?.data.message)
      alert('FORMULÁRIO ENVIADO COM SUCESSO')

      if (CreateFormReducer.viewAnswer) Router.push(`/classroom/subject/${CreateFormReducer.classSubjectId}/task/${CreateFormReducer.id}/resp`)
      else Router.push(`/classroom/subject/${CreateFormReducer.classSubjectId}`)
    } catch (error: any) {
      alert(error.message ?? 'Erro ao enviar formulário.')
    } finally {
      dispatch(setFormLoadingAction(false))
    }
  }
