import { FlexGridColumnProps } from 'components/Elements/FlexGrid/types'

import { dateToInput } from 'utils/helpers/Date'
import { hourMask } from 'utils/helpers/String'

import { TeacherClassRoomSubjectListProps, TeacherMonthClassListProps, TeacherTaskListProps } from '../types'

export const generateTeacherClassRoomSubjectConsultColumns = (): Array<FlexGridColumnProps<TeacherClassRoomSubjectListProps>> => [
  {
    label: 'Curso',
    key: 'courseName',
    orderable: true
  },
  {
    label: 'Nome',
    key: 'subjectName',
    orderable: true
  }
]

export const generateTeacherMonthClassConsultColumns = (): Array<FlexGridColumnProps<TeacherMonthClassListProps>> => [
  {
    label: 'Curso',
    key: 'courseName',
    orderable: true
  },
  {
    label: 'Matéria',
    key: 'subjectName'
  },
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

export const generateTeacherTaskConsultColumns = (): Array<FlexGridColumnProps<TeacherTaskListProps>> => [
  {
    label: 'Título',
    key: 'title'
  },
  {
    label: 'Curso',
    key: 'courseName',
    orderable: true
  },
  {
    label: 'Matéria',
    key: ['classRoomSubject', 'name']
  },
  {
    label: 'Respostas',
    key: 'responseCount'
  },
  {
    label: 'Inicio em',
    key: 'startline',
    orderable: true,
    transform: dateToInput
  },
  {
    label: 'Encerra em',
    key: 'deadline',
    orderable: true,
    transform: dateToInput
  }
]
