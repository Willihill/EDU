import HttpBase from 'services/HttpBase'

import { ClassRoomSubjectClassProps, ClassRoomSubjectMessageProps, ClassRoomSubjectMessagePushProps, ClassRoomSubjectTaskProps } from '../types'

export const getClassRoomSubjectMessagesApi = async (classRoomSubjectId: number) =>
  await HttpBase.get<ClassRoomSubjectMessageProps[]>(`/api/ClassRoom/subject/${classRoomSubjectId}/messages`)

export const postClassRoomSubjectMessageApi = async (classRoomSubjectId: number, data: ClassRoomSubjectMessagePushProps) =>
  await HttpBase.post(`/api/ClassRoom/subject/${classRoomSubjectId}/messages/push`, data)

export const getClassRoomSubjectClassesApi = async (classRoomSubjectId: number) =>
  await HttpBase.get<ClassRoomSubjectClassProps[]>(`/api/ClassRoom/subject/${classRoomSubjectId}/classes`)

export const getClassRoomSubjectTasksApi = async (classRoomSubjectId: number) =>
  await HttpBase.get<ClassRoomSubjectTaskProps[]>(`/api/ClassRoom/subject/${classRoomSubjectId}/tasks`)
