import { useDispatch, useSelector } from 'react-redux'

import { changeCurrentUniversityService } from 'services/AuthService/Client'
import { UserVisualizationType } from 'services/AuthService/types'
import { UniversityProps } from 'services/UniversityService/types'

import { RootState } from 'store/reducer'
import { setConfigAction } from 'store/reducer/ConfigReducer/actions'
import { ConfigState } from 'store/reducer/ConfigReducer/types'

const useConfig = () => {
  const dispatch = useDispatch()
  const ConfigReducer = useSelector((state: RootState) => state.ConfigReducer)
  const isAuthenticated = !!ConfigReducer.userId
  const isAdmin = ConfigReducer.userVisualizationType === UserVisualizationType.Admin
  const isTeacher = ConfigReducer.userVisualizationType === UserVisualizationType.Teacher
  const isStudent = ConfigReducer.userVisualizationType === UserVisualizationType.Student

  const onChangeUniversity = (data: UniversityProps) =>
    async () => await changeCurrentUniversityService(data)
  const setConfigData = (value: ConfigState) => dispatch(setConfigAction(value))

  return {
    ...ConfigReducer,
    isAuthenticated,
    isAdmin,
    isTeacher,
    isStudent,
    onChangeUniversity,
    setConfigData
  }
}

export default useConfig
