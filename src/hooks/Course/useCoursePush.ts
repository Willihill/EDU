import { useDispatch, useSelector } from 'react-redux'

import { submitCoursePushService } from 'services/CourseService/Client'
import { CoursePushProps } from 'services/CourseService/types'

import { RootState } from 'store/reducer'
import {
  setCoursePushNameAction,
  setCoursePushDurationAction,
  setCoursePushNewSubjectNameAction,
  addCoursePushSubjectAction,
  removeCoursePushSubjectAction,
  setCoursePushDataAction,
  resetCoursePushAction
} from 'store/reducer/CourseReducer/CoursePushReducer/actions'

const useCoursePush = () => {
  const dispatch = useDispatch()
  const CoursePushReducer = useSelector((state: RootState) => state.CoursePushReducer)

  const onChangeName = (data: string) => dispatch(setCoursePushNameAction(data))
  const onChangeDuration = (data: number) => dispatch(setCoursePushDurationAction(data))

  const onChangeNewSubjectName = (data: string) => dispatch(setCoursePushNewSubjectNameAction(data))
  const onPressAddSubject = () => dispatch(addCoursePushSubjectAction())
  const onPressRemoveSubject = (index: number) => () => dispatch(removeCoursePushSubjectAction(index))

  const onPressSubmiteCoursePush = () => dispatch(submitCoursePushService())

  const setCoursePushData = (value: CoursePushProps) => dispatch(setCoursePushDataAction(value))
  const resetCoursePush = () => dispatch(resetCoursePushAction())

  return {
    ...CoursePushReducer,
    onChangeName,
    onChangeDuration,
    onChangeNewSubjectName,
    onPressAddSubject,
    onPressRemoveSubject,
    onPressSubmiteCoursePush,
    setCoursePushData,
    resetCoursePush
  }
}

export default useCoursePush
