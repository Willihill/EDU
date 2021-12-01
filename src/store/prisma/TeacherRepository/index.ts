import { UniversityTeacherListFilters } from 'services/UniversityService/types'

import { Teacher, TeacherInvite } from '@prisma/client'

import Repository from '../repository'

export default class TeacherRepository extends Repository {
  create = async (studantData: Omit<Teacher, 'id'>) =>
    await this.prisma.teacher.create({
      data: studantData
    })

  findInviteByCpf = async (cpf: number, universityId: number) =>
    await this.prisma.teacherInvite.findFirst({
      where: {
        cpf,
        universityId
      }
    })

  findByUniversity = async (universityId: number, filters?: UniversityTeacherListFilters) =>
    await this.prisma.teacher.findMany({
      where: {
        universityId,
        user: {
          name: {
            contains: filters?.name
          }
        }
      },
      include: {
        user: true
      }
    })

  findTeachersInvitedByUniversity = async (universityId: number) =>
    await this.prisma.teacherInvite.findMany({
      where: {
        universityId
      },
      include: {
        teacher: {
          include: {
            user: true
          }
        }
      }
    })

  findByUserUniversity = async (userId: number, universityId: number) =>
    await this.prisma.teacher.findFirst({
      where: {
        userId,
        universityId
      }
    })

  getInviteData = async (classToken: string) =>
    await this.prisma.classRoom
      .findFirst({
        where: {
          classToken
        },
        include: {
          course: {
            include: {
              university: true
            }
          }
        }
      })

  markAccpetInvite = async (inviteId: number, teacherId: number, acceptDate: Date) =>
    await this.prisma.teacherInvite.update({
      where: {
        id: inviteId
      },
      data: {
        teacherId,
        acceptDate
      }
    })

  pushInvite = async (data: Omit<TeacherInvite, 'id'>) =>
    await this.prisma.teacherInvite.create({
      data
    })

  deleteInvite = async (inviteId: number) =>
    await this.prisma.teacherInvite.delete({
      where: {
        id: inviteId
      }
    })

  findCountByUniversity = async (universityId: number) =>
    await this.prisma.teacher.count({
      where: {
        universityId
      }
    })
}
