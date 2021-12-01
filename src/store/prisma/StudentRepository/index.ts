import { Student, StudentInvite } from '@prisma/client'

import Repository from '../repository'

export default class StudentRepository extends Repository {
  findByUserClassRoom = async (userId: number, classRoomId: number) =>
    await this.prisma.student.findFirst({
      where: {
        userId,
        classRoomId
      }
    })

  create = async (studantData: Omit<Student, 'id'>) =>
    await this.prisma.student.create({
      data: studantData
    })

  deleteNotRange = async (ids: number[], classRoomId: number) =>
    await this.prisma.studentInvite.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        classRoomId
      }
    })

  pushSetRange = async (studentInvitees: Array<Pick<StudentInvite, 'id' | 'cpf' | 'classRoomId'>>) =>
    await Promise.all(
      studentInvitees.map(({ id, ...studentInvite }) => this.prisma.studentInvite.upsert({
        create: studentInvite,
        update: studentInvite,
        where: {
          id
        }
      }))
    )

  findInvitesByClassRoom = async (classRoomId: number) =>
    await this.prisma.studentInvite.findMany({
      where: {
        classRoomId
      },
      include: {
        student: {
          include: {
            user: true
          }
        }
      }
    })

  findCountByUniversity = async (universityId: number) =>
    await this.prisma.student.count({
      where: {
        classRoom: {
          course: {
            universityId
          }
        }
      }
    })
}
