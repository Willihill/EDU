import { useDispatch, useSelector } from 'react-redux'

import { submitInviteUserService } from 'services/ClassRoomService/Client'

import { RootState } from 'store/reducer'
import { setInviteCoordenadorAction, setInviteCursoAction, setInviteUniversityAction, setInviteimageUniversityAction } from 'store/reducer/InviteReducer/ClassroomInviteReducer/actions'

const useInvite = () => {
  const dispatch = useDispatch()
  const InviteReducer = useSelector((state: RootState) => state.InviteReducer)

  const onChangeCoordenador = (value: string) => dispatch(setInviteCoordenadorAction(value))
  const onChangeCurso = (value: string) => dispatch(setInviteCursoAction(value))
  const onChangeUniversity = (value: string) => dispatch(setInviteUniversityAction(value))
  const onChangeImageUniversity = (value: string) => dispatch(setInviteimageUniversityAction(value))

  const onRedirectUser = () => dispatch(submitInviteUserService())

  return {
    ...InviteReducer,
    onChangeCoordenador,
    onChangeCurso,
    onChangeUniversity,
    onChangeImageUniversity,
    onRedirectUser
  }
}

export default useInvite
