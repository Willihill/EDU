import { FlexGridColumnComponent, FlexGridColumnProps } from 'components/Elements/FlexGrid/types'

import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

import { RootState } from 'store/reducer'
import { setCoursePushLoadingAction } from 'store/reducer/CourseReducer/CoursePushReducer/actions'

import { Dispatch } from 'redux'
import { asyncPromise } from 'utils/helpers/Promise'

import { coursePushStateToPushPropsFactory } from '../factory'
import { CourseListProps, CoursePushSubjectProps } from '../types'
import { postCourseApi } from './api'

export const submitCoursePushService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const CoursePushReducer = getState().CoursePushReducer

      dispatch(setCoursePushLoadingAction(true))

      const { err } = await asyncPromise(postCourseApi(coursePushStateToPushPropsFactory(CoursePushReducer)))
      if (err) throw new Error(err.response?.data.message)
      alert('Dados salvos com sucesso')

      NavigationService.navigateToRoute(NavigationRoutes.AdminCourses)
    } catch (error: any) {
      alert(error.message)
    } finally {
      dispatch(setCoursePushLoadingAction(false))
    }
  }

export const generateAdminCourseConsultColumns = (): Array<FlexGridColumnProps<CourseListProps>> => [
  {
    label: 'Nome',
    key: 'name',
    orderable: true
  },
  {
    label: 'Duração (Sem.)',
    key: 'duration',
    orderable: true
  }
]

export const generateAdminCourseSubjectColumns = (component: FlexGridColumnComponent<CoursePushSubjectProps>): Array<FlexGridColumnProps<CoursePushSubjectProps>> => [
  {
    label: 'Nome',
    key: 'name',
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
