import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { classRoomPushAddCalendarWeekService, classRoomPushAddStudentInviteService, classRoomPushChangeCourseService, classRoomPushChangeStartDateService, classRoomPushCopyCalendarWeekService, submitClassRoomPushService } from 'services/ClassRoomService/Client'
import { ClassRoomPushCalendarWeekDayClassProps, ClassRoomPushProps } from 'services/ClassRoomService/types'
import { CourseListProps } from 'services/CourseService/types'
import { universityTeacherListToCommonDataFactory } from 'services/UniversityService/factory'
import { UniversityTeacherListProps } from 'services/UniversityService/types'

import { RootState } from 'store/reducer'
import {
  setClassRoomPushCodeAction,
  setClassRoomPushCoordinatorAction,
  setClassRoomPushSubjectKeyDataAction,
  addClassRoomPushCalendarWeekDayClassAction,
  setClassRoomPushCalendarWeekDayClassInfoAction,
  removeClassRoomPushCalendarWeekDayClassAction,
  setClassRoomPushDataAction,
  resetClassRoomPushAction
} from 'store/reducer/ClassRoomReducer/ClassRoomPushReducer/actions'
import { CalendarWeekDayClassKeys, CalendarWeekDays } from 'store/reducer/ClassRoomReducer/ClassRoomPushReducer/types'

import { CommonDataProps } from 'utils/common/types'
import { parseNumeric } from 'utils/helpers/Number'
import { cpfRemoveCaracter } from 'utils/helpers/String'

const useAdminClassRoomPush = () => {
  const [semeterList, setSemeterList] = useState<number[]>([])
  const [inviteCPF, setInviteCPF] = useState('')
  const dispatch = useDispatch()
  const ClassRoomPushReducer = useSelector((state: RootState) => state.ClassRoomPushReducer)

  useEffect(() => {
    setSemeterList(
      Array
        .from(Array(ClassRoomPushReducer.courseDuration).keys())
        .map(i => i + 1)
    )
  }, [ClassRoomPushReducer.courseDuration])

  const onChangeCode = (data: string) => dispatch(setClassRoomPushCodeAction(data))
  const onChangeStartDate = (data: string) => dispatch(classRoomPushChangeStartDateService(data))
  const onChangeCourse = (data: CourseListProps) => dispatch(classRoomPushChangeCourseService(data))
  const onChangeCoordinator = (data: CommonDataProps) => dispatch(setClassRoomPushCoordinatorAction(data))
  const onChangeSubjectSemester = (subjectIndex: number) => (semester: number) => dispatch(setClassRoomPushSubjectKeyDataAction(subjectIndex, 'semester', semester))
  const onChangeSubjectTeacher = (subjectIndex: number) => (teacher: UniversityTeacherListProps) => dispatch(setClassRoomPushSubjectKeyDataAction(subjectIndex, 'teacher', universityTeacherListToCommonDataFactory(teacher)))

  const onPressAddCalendarWeekDayClass = (weekIndex: number, weekDay: CalendarWeekDays) => dispatch(addClassRoomPushCalendarWeekDayClassAction(weekIndex, weekDay))
  const onChangeCalendarWeekDayClassInfo = (weekIndex: number, weekDay: CalendarWeekDays, weekDayClassIndex: number, weekDayClassKey: CalendarWeekDayClassKeys, value: ClassRoomPushCalendarWeekDayClassProps[CalendarWeekDayClassKeys]) => dispatch(setClassRoomPushCalendarWeekDayClassInfoAction(weekIndex, weekDay, weekDayClassIndex, weekDayClassKey, value))
  const onPressRemoveCalendarWeekDayClass = (weekIndex: number, weekDay: CalendarWeekDays, weekDayClassIndex: number) => dispatch(removeClassRoomPushCalendarWeekDayClassAction(weekIndex, weekDay, weekDayClassIndex))

  const onPressAddCalendarWeek = () => dispatch(classRoomPushAddCalendarWeekService())
  const onPressCopyCalendarWeek = (weekNumber: number) => dispatch(classRoomPushCopyCalendarWeekService(weekNumber))
  const onPressSubmiteClassRoomPush = () => dispatch(submitClassRoomPushService())

  const onChangeInviteCPF = (data: string) => setInviteCPF(cpfRemoveCaracter(data))
  const onPressAddInvite = async () =>
    dispatch(classRoomPushAddStudentInviteService(parseNumeric(inviteCPF), () => {
      setInviteCPF('')
    }))

  const setClassRoomPushData = (value: ClassRoomPushProps) => dispatch(setClassRoomPushDataAction(value))
  const resetClassRoomPush = () => dispatch(resetClassRoomPushAction())

  return {
    ...ClassRoomPushReducer,
    inviteCPF,
    semeterList,
    onChangeCode,
    onChangeStartDate,
    onChangeCourse,
    onChangeCoordinator,
    onChangeSubjectSemester,
    onChangeSubjectTeacher,
    onPressAddCalendarWeek,
    onPressCopyCalendarWeek,
    onPressAddCalendarWeekDayClass,
    onChangeCalendarWeekDayClassInfo,
    onPressRemoveCalendarWeekDayClass,
    onChangeInviteCPF,
    onPressAddInvite,
    onPressSubmiteClassRoomPush,
    setClassRoomPushData,
    resetClassRoomPush
  }
}

export default useAdminClassRoomPush
