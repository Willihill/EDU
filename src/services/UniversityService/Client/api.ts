import HttpBase from 'services/HttpBase'

import { UniversityAmountProps, UniversityProps, UniversityTeacherInviteListProps, UniversityTeacherInvitePushProps, UniversityTeacherListFilters, UniversityTeacherListProps } from '../types'

export const getUniversitiesApi = async () =>
  await HttpBase.get<UniversityProps[]>('/api/University/list')

export const getUniversityTeachersApi = async (filters: UniversityTeacherListFilters) =>
  await HttpBase.get<UniversityTeacherListProps[]>('/api/University/Teacher/list', { params: filters })

export const postUniversityTeacherInviteApi = async (inviteToken: string) =>
  await HttpBase.post(`/api/University/Teacher/Invite/${inviteToken}`)

export const getUniversityTeachersInvitedApi = async () =>
  await HttpBase.get<UniversityTeacherInviteListProps[]>('/api/University/Teacher/Invite/list')

export const deleteUniversityTeacherInvitedApi = async (inviteId: number) =>
  await HttpBase.delete(`/api/University/Teacher/Invite/Delete/${inviteId}`)

export const postUniversityTeacherInvitedApi = async (data: UniversityTeacherInvitePushProps) =>
  await HttpBase.post('/api/University/Teacher/Invite/push', data)

export const getUniversityAmountApi = async () =>
  await HttpBase.get<UniversityAmountProps[]>('/api/University/amount')
