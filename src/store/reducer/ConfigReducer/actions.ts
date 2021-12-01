import {
  SET_USER,
  SET_CONFIG,
  RESET_CONFIG,
  ConfigState
} from './types'

export const setConfigUserAction = (payload: string) => ({ type: SET_USER, payload })

export const setConfigAction = (payload: ConfigState) => ({ type: SET_CONFIG, payload })
export const resetConfigAction = () => ({ type: RESET_CONFIG })
