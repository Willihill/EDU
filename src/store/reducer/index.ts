import { combineReducers } from 'redux'

import ClassRoomPushReducer from './ClassRoomReducer/ClassRoomPushReducer'
import { ClassRoomPushState } from './ClassRoomReducer/ClassRoomPushReducer/types'
import ConfigReducer from './ConfigReducer'
import { ConfigState } from './ConfigReducer/types'
import CoursePushReducer from './CourseReducer/CoursePushReducer'
import { CoursePushState } from './CourseReducer/CoursePushReducer/types'
import CreateFormReducer from './FormReducer/CreateFormReducer'
import { CreateFormState } from './FormReducer/CreateFormReducer/types'
import ClassroomInviteReducer from './InviteReducer/ClassroomInviteReducer'
import { ClassrromInviteState } from './InviteReducer/ClassroomInviteReducer/types'
import TeacherInviteReducer from './InviteReducer/TeacherInviteReducer'
import { TeacherInviteState } from './InviteReducer/TeacherInviteReducer/types'
import LoginReducer from './LoginReducer'
import { LoginState } from './LoginReducer/types'
import SignupReducer from './SignupReducer'
import { SignupState } from './SignupReducer/types'

export interface RootState {
  ClassRoomPushReducer: ClassRoomPushState
  LoginReducer: LoginState
  SignupReducer: SignupState
  ClassroomInviteReducer: ClassrromInviteState
  ConfigReducer: ConfigState
  CoursePushReducer: CoursePushState
  CreateFormReducer: CreateFormState
  TeacherInviteReducer: TeacherInviteState
}

const rootReducer = combineReducers({
  LoginReducer,
  SignupReducer,
  ClassRoomPushReducer,
  ClassroomInviteReducer,
  ConfigReducer,
  CoursePushReducer,
  CreateFormReducer,
  TeacherInviteReducer
})

export default rootReducer
