import { FlexGridColumnComponent, FlexGridColumnProps } from 'components/Elements/FlexGrid/types'

import { dateToInput } from 'utils/helpers/Date'
import { asyncPromise } from 'utils/helpers/Promise'
import { hourMask } from 'utils/helpers/String'

import { ClassRoomSubjectClassProps, ClassRoomSubjectTaskProps } from '../types'
import { postClassRoomSubjectMessageApi } from './api'

export const sendClassRoomSubjectMessageService = async (classRoomSubjectId: number, message: string, fallback: () => void) => {
  try {
    if (!message) throw new Error('Mensagem não informada')

    const { err } = await asyncPromise(postClassRoomSubjectMessageApi(classRoomSubjectId, { message }))
    if (err) throw new Error(err.response?.data?.message)

    fallback()
  } catch (error: any) {
    alert(error.message)
  }
}

export const generateClassRoomSubjectClasseColumns = (): Array<FlexGridColumnProps<ClassRoomSubjectClassProps>> => [
  {
    label: 'Data',
    key: 'date',
    width: 100,
    transform: dateToInput
  },
  {
    label: '',
    key: 'weekDayName'
  },
  {
    label: 'Inicio',
    key: 'startAt',
    transform: hourMask
  },
  {
    label: 'Fim',
    key: 'endAt',
    transform: hourMask
  }
]

export const generateClassRoomSubjectTaskColumns = (
  statusComponent: FlexGridColumnComponent<ClassRoomSubjectTaskProps>
): Array<FlexGridColumnProps<ClassRoomSubjectTaskProps>> => [
  {
    label: 'Título',
    key: 'title'
  },
  {
    label: 'Inicio em',
    key: 'startline',
    transform: dateToInput
  },
  {
    label: 'Encerra em',
    key: 'deadline',
    transform: dateToInput
  },
  {
    label: 'Status',
    key: 'id',
    component: statusComponent
  }
]
