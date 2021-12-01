import { useDispatch, useSelector } from 'react-redux'

import { submitSignupService } from 'services/AuthService/Client'

import { RootState } from 'store/reducer'
import { setSignupCpfAction, setSignupEmailAction, setSignupNameAction, setSignupPasswordAction, setSignupUserAction } from 'store/reducer/SignupReducer/actions'

const useSignup = () => {
  const dispatch = useDispatch()
  const SignupReducer = useSelector((state: RootState) => state.SignupReducer)

  const onChangeUser = (value: string) => dispatch(setSignupUserAction(value))
  const onChangeEmail = (value: string) => dispatch(setSignupEmailAction(value))
  const onChangeCpf = (value: number) => dispatch(setSignupCpfAction(value))
  const onChangeName = (value: string) => dispatch(setSignupNameAction(value))
  const onChangePassword = (value: string) => dispatch(setSignupPasswordAction(value))

  const onSubmitCadastro = () => dispatch(submitSignupService())

  return {
    ...SignupReducer,
    onChangeUser,
    onChangeEmail,
    onChangeCpf,
    onChangeName,
    onChangePassword,
    onSubmitCadastro
  }
}

export default useSignup
