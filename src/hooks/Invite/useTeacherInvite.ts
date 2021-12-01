import { useDispatch, useSelector } from 'react-redux'

import { submitTeacherInviteService } from 'services/UniversityService/Client'
import { UniversityTeacherInviteProps } from 'services/UniversityService/types'

import { RootState } from 'store/reducer'
import { setTeacherInviteDataAction } from 'store/reducer/InviteReducer/TeacherInviteReducer/actions'

const useTeacherInvite = () => {
  const dispatch = useDispatch()
  const TeacherInviteReducer = useSelector((state: RootState) => state.TeacherInviteReducer)

  const setTeacherInviteData = (value: UniversityTeacherInviteProps) => dispatch(setTeacherInviteDataAction(value))
  const onPressAcceptInvite = () => dispatch(submitTeacherInviteService())

  return {
    ...TeacherInviteReducer,
    setTeacherInviteData,
    onPressAcceptInvite
  }
}

export default useTeacherInvite
