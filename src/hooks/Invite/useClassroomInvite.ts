import { useDispatch, useSelector } from 'react-redux'

import { submitInviteUserService } from 'services/ClassRoomService/Client'
import { ClassroomInviteTokenProps } from 'services/ClassRoomService/types'

import { RootState } from 'store/reducer'
import {
  setClassrromInviteDataAction
} from 'store/reducer/InviteReducer/ClassroomInviteReducer/actions'

const useClassroomInvite = () => {
  const dispatch = useDispatch()
  const ClassroomInviteReducer = useSelector((state: RootState) => state.ClassroomInviteReducer)

  const setClassroomInviteData = (value: ClassroomInviteTokenProps) => dispatch(setClassrromInviteDataAction(value))
  const onPressAcceptInvite = () => dispatch(submitInviteUserService())

  return {
    ...ClassroomInviteReducer,
    setClassroomInviteData,
    onPressAcceptInvite
  }
}

export default useClassroomInvite
