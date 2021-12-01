import { FlexGridColumnComponent, FlexGridColumnProps } from 'components/Elements/FlexGrid/types'

import { dateToInput } from 'utils/helpers/Date'
import { hourMask } from 'utils/helpers/String'

import { StudentClassRoomSubjectListProps, StudentMonthClassListProps, StudentTaskListProps } from '../types'

export const generateStudentClassRoomSubjectConsultColumns = (): Array<FlexGridColumnProps<StudentClassRoomSubjectListProps>> => [
  {
    label: 'Nome',
    key: 'subjectName'
  },
  {
    label: 'Professor',
    key: 'teacherName'
  }
]

export const generateStudentMonthClassConsultColumns = (): Array<FlexGridColumnProps<StudentMonthClassListProps>> => [
  {
    label: 'Matéria',
    key: 'subjectName'
  },
  {
    label: 'Professor',
    key: 'teacherName'
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

export const generateStudentTaskConsultColumns = (statusComponent: FlexGridColumnComponent<StudentTaskListProps>): Array<FlexGridColumnProps<StudentTaskListProps>> => [
  {
    label: 'Título',
    key: 'title'
  },
  {
    label: 'Matéria',
    key: ['classRoomSubject', 'name']
  },
  {
    label: 'Professor',
    key: 'teacherName'
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
  },
  {
    label: 'Status',
    key: 'status',
    orderable: true,
    component: statusComponent
  }
]
