import { UserVisualizationType } from 'services/AuthService/types'

import { ActionType } from 'utils/common/types'

import {
  ConfigState,
  SET_USER,
  SET_CONFIG,
  RESET_CONFIG
} from './types'

export const initialState: ConfigState = {
  userId: 0,
  user: '',
  remenber: false,
  currentUniversityId: 0,
  userVisualizationType: UserVisualizationType.Student
}

const ConfigReducer = (state: ConfigState = initialState, { type, payload }: ActionType): ConfigState => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload }
    case SET_CONFIG:
      return { ...state, ...payload }
    case RESET_CONFIG:
      return initialState
    default:
      return state
  }
}

export default ConfigReducer
