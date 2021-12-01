import HttpBase from 'services/HttpBase'

import { ClassRoomListProps, ClassRoomPushProps } from '../types'

export const getClassRoomsApi = async () =>
  await HttpBase.get<ClassRoomListProps[]>('/api/ClassRoom/admin/list')

export const postClassroomInviteApi = async (classToken: string) =>
  await HttpBase.post(`/api/ClassRoom/addStudent/${classToken}`)

export const postClassRoomApi = async (data: ClassRoomPushProps) =>
  await HttpBase.post('/api/ClassRoom/push', data)
