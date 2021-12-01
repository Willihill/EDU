import { FlexGridColumnComponent, FlexGridColumnProps } from 'components/Elements/FlexGrid/types'

import { getCourseSubjectsApi } from 'services/CourseService/Client/api'
import { courseSubjectListToClassRoomPushSubjectFactory } from 'services/CourseService/factory'
import { CourseListProps } from 'services/CourseService/types'
import NavigationService from 'services/NavigationService'
import { NavigationRoutes } from 'services/NavigationService/types'

import { RootState } from 'store/reducer'
import { addClassRoomPushCalendarWeekAction, addClassRoomPushStudentInviteAction, addClassRoomPushSubjectAction, cleanClassRoomPushSubjectsAction, setClassRoomPushCourseAction, setClassRoomPushCourseDurationAction, setClassRoomPushLoadingAction, setClassRoomPushStartDateAction } from 'store/reducer/ClassRoomReducer/ClassRoomPushReducer/actions'
import { setClassrromInviteLoadingAction } from 'store/reducer/InviteReducer/ClassroomInviteReducer/actions'

import { Dispatch } from 'redux'
import { maxValueByKeyArray } from 'utils/helpers/Array'
import { dateAddDays, dateAddWeeks, dateToDb, dateToInput, getStartWeek } from 'utils/helpers/Date'
import { asyncPromise } from 'utils/helpers/Promise'
import { cpfMask } from 'utils/helpers/String'
import { validaCpf } from 'utils/validation'

import { classRoomStateToPushPropsFactory } from '../factory'
import { ClassRoomListProps, ClassRoomPushCalendarWeekDayProps, ClassRoomPushSubjectProps, ClassRoomStudentInviteProps } from '../types'
import { postClassRoomApi, postClassroomInviteApi } from './api'
import { classRoomPushHandleError } from './error'

export const submitInviteUserService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { token } = getState().ClassroomInviteReducer

    try {
      dispatch(setClassrromInviteLoadingAction(true))
      const { err } = await asyncPromise(postClassroomInviteApi(token))

      if (err) throw new Error(err.response?.data.message)
      alert('VOCÊ AGORA FAZ PARTE DA TURMA')

      NavigationService.navigateToRoute(NavigationRoutes.Home)
    } catch (error: any) {
      alert(error.message ?? 'Erro ao entrar na turma.')
    } finally {
      dispatch(setClassrromInviteLoadingAction(false))
    }
  }

export const classRoomPushChangeStartDateService = (startDate: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { calendarWeeks } = getState().ClassRoomPushReducer
      if (calendarWeeks.length) throw new Error('Não é possível alterar a data pois o calendario já foi criado.')

      dispatch(setClassRoomPushStartDateAction(startDate))
    } catch (error: any) {
      alert(error.message)
    }
  }

export const classRoomPushAddCalendarWeekService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { startDate, calendarWeeks } = getState().ClassRoomPushReducer

      const lastWeekNumber = maxValueByKeyArray(calendarWeeks, 'weekNumber')
      const weekFisrtDate = !calendarWeeks.length
        ? dateToDb(getStartWeek(startDate))
        : dateAddDays(calendarWeeks
          .find(i => i.weekNumber === lastWeekNumber)
          ?.saturday.date, 1)

      const days: ClassRoomPushCalendarWeekDayProps[] = Array
        .from(Array(7).keys())
        .map(dayNumber => ({
          date: dateToDb(dateAddDays(weekFisrtDate, dayNumber)),
          weekDay: dayNumber,
          classes: []
        }))

      dispatch(addClassRoomPushCalendarWeekAction({
        weekNumber: lastWeekNumber + 1,
        sunday: days[0],
        monday: days[1],
        tuesday: days[2],
        wednesday: days[3],
        thursday: days[4],
        friday: days[5],
        saturday: days[6]
      }))
    } catch (error: any) {
      alert(error.message)
    }
  }

export const classRoomPushCopyCalendarWeekService = (calendarWeekNumber: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { calendarWeeks } = getState().ClassRoomPushReducer

      const lastWeekNumber = maxValueByKeyArray(calendarWeeks, 'weekNumber')
      const lastWeek = calendarWeeks.find(i => i.weekNumber === lastWeekNumber)
      if (!lastWeek) throw new Error('Ultima semana não encontrada')

      const weekToCopy = calendarWeeks.find(i => i.weekNumber === calendarWeekNumber)
      if (!weekToCopy) throw new Error('Semana não encontrada para duplicação')

      const weekFisrtDate = dateToDb(getStartWeek(dateAddWeeks(lastWeek.sunday.date, 1)))

      const days: ClassRoomPushCalendarWeekDayProps[] = Array
        .from(Array(7).keys())
        .map(dayNumber => ({
          date: dateToDb(dateAddDays(weekFisrtDate, dayNumber)),
          weekDay: dayNumber,
          classes: (
            dayNumber === 0
              ? weekToCopy.sunday.classes
              : dayNumber === 1
                ? weekToCopy.monday.classes
                : dayNumber === 2
                  ? weekToCopy.tuesday.classes
                  : dayNumber === 3
                    ? weekToCopy.wednesday.classes
                    : dayNumber === 4
                      ? weekToCopy.thursday.classes
                      : dayNumber === 5
                        ? weekToCopy.friday.classes
                        : weekToCopy.saturday.classes
          ).map(i => ({
            ...i,
            id: 0
          }))
        }))

      dispatch(addClassRoomPushCalendarWeekAction({
        weekNumber: lastWeek.weekNumber + 1,
        sunday: days[0],
        monday: days[1],
        tuesday: days[2],
        wednesday: days[3],
        thursday: days[4],
        friday: days[5],
        saturday: days[6]
      }))
    } catch (error: any) {
      alert(error.message)
    }
  }

export const classRoomPushChangeCourseService = (course: CourseListProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { course: currentCourse } = getState().ClassRoomPushReducer

      if (currentCourse.id === course.id) return

      dispatch(setClassRoomPushCourseDurationAction(course.duration))
      dispatch(setClassRoomPushCourseAction({
        id: course.id,
        name: course.name
      }))

      const { resp } = await asyncPromise(getCourseSubjectsApi(course.id))
      if (!resp) throw new Error('Erro ao consultar dados do curso')

      const couseSubjects = resp.data

      dispatch(cleanClassRoomPushSubjectsAction())
      couseSubjects
        .map<ClassRoomPushSubjectProps>(couseSubject => courseSubjectListToClassRoomPushSubjectFactory(couseSubject))
        .forEach(i => dispatch(addClassRoomPushSubjectAction(i)))
    } catch (error: any) {
      alert(error.message ?? 'Erro ao entrar na turma.')
    }
  }

export const classRoomPushAddStudentInviteService = (CPF: number, fallback: () => void) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { studentInvitees } = getState().ClassRoomPushReducer

      if (!validaCpf(CPF.toString())) throw new Error('CPF inválido')

      const already = studentInvitees.find(i => i.CPF === CPF)
      if (already) throw new Error('CPF já foi convidade para esta turma')

      dispatch(addClassRoomPushStudentInviteAction(CPF))
      fallback()
    } catch (error: any) {
      alert(error.message)
    }
  }

export const submitClassRoomPushService = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { ClassRoomPushReducer } = getState()

      dispatch(setClassRoomPushLoadingAction(true))
      classRoomPushHandleError(ClassRoomPushReducer)

      const { err } = await asyncPromise(postClassRoomApi(classRoomStateToPushPropsFactory(ClassRoomPushReducer)))
      if (err) throw new Error(err.response?.data.message)

      alert('Dados salvos com sucesso')
    } catch (error: any) {
      alert(error.message)
    } finally {
      dispatch(setClassRoomPushLoadingAction(false))
    }
  }

export const generateAdminClassRoomConsultColumns = (): Array<FlexGridColumnProps<ClassRoomListProps>> => [
  {
    label: 'Código',
    key: 'code',
    orderable: true
  },
  {
    label: 'Curso',
    key: 'courseName',
    orderable: true
  },
  {
    label: 'Coordenador',
    key: 'coordinatorName',
    orderable: true
  },
  {
    label: 'Inicia em',
    key: 'startDate',
    orderable: true
  }
]

export const generateAdminClassRoomStudenInviteColumns = (actionsComponent: FlexGridColumnComponent<ClassRoomStudentInviteProps>): Array<FlexGridColumnProps<ClassRoomStudentInviteProps>> => [
  {
    label: 'CPF',
    key: 'CPF',
    transform: data => cpfMask(data.toString().padStart(11, '0'))
  },
  {
    label: 'Aluno',
    key: ['student', 'name']
  },
  {
    label: 'Aceito em',
    key: 'acceptAt',
    transform: dateToInput
  },
  {
    label: '',
    key: 'id',
    component: actionsComponent
  }
]

export const generateAdminClassRoomSubjectColumns = (
  teacherComponent: FlexGridColumnComponent<ClassRoomPushSubjectProps>,
  semesterComponent: FlexGridColumnComponent<ClassRoomPushSubjectProps>
): Array<FlexGridColumnProps<ClassRoomPushSubjectProps>> => [
  {
    label: 'Nome',
    key: ['courseSubject', 'name']
  },
  {
    label: 'Professor',
    key: ['teacher', 'name'],
    component: teacherComponent
  },
  {
    label: 'Semestre',
    key: 'semester',
    component: semesterComponent
  }
]
