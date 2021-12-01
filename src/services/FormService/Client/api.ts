import HttpBase from 'services/HttpBase'

import { ConfigFormPushProps, ConfigResponseFormPushProps } from '../types'

export const postCreateFormApi = async (id: number, data: ConfigFormPushProps) =>
  await HttpBase.post(`/api/ClassRoom/subject/${id}/tasks/push`, data)

export const postResponseFormApi = async (id: number, formId: number, data: ConfigResponseFormPushProps) =>
  await HttpBase.post(`/api/ClassRoom/${id}/Form/${formId}/response`, data)
