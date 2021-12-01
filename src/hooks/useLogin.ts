import { useDispatch, useSelector } from 'react-redux'

import { submitLoginService } from 'services/AuthService/Client'

import { RootState } from 'store/reducer'
import { setLoginPasswordAction, setLoginRemenberAction, setLoginUserAction } from 'store/reducer/LoginReducer/actions'

const useLogin = () => {
  const dispatch = useDispatch()
  const LoginReducer = useSelector((state: RootState) => state.LoginReducer)

  const onChangeUser = (value: string) => dispatch(setLoginUserAction(value))
  const onChangePassword = (value: string) => dispatch(setLoginPasswordAction(value))
  const onChangeRemenber = () => dispatch(setLoginRemenberAction(!LoginReducer.remenber))

  const onSubmitLogin = () => dispatch(submitLoginService())

  return {
    ...LoginReducer,
    onChangeUser,
    onChangePassword,
    onChangeRemenber,
    onSubmitLogin
  }
}

export default useLogin
