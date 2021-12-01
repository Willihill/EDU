import { ClassRoom } from '.prisma/client'

import Repository from '../repository'

export default class ClassRoomRepository extends Repository {
  pushSet = async ({ id, ...classRoom }: ClassRoom) =>
    await this.prisma.classRoom.upsert({
      create: classRoom,
      update: classRoom,
      where: {
        id
      }

    })

  findByUniversity = async (universityId: number) =>
    await this.prisma.classRoom.findMany({
      where: {
        course: {
          universityId
        }
      },
      include: {
        course: true,
        coordinator: {
          include: {
            user: true
          }
        }
      }
    })

  findByIdUniversity = async (classRoomId: number, universityId: number) =>
    await this.prisma.classRoom.findFirst({
      where: {
        course: {
          id: classRoomId,
          universityId
        }
      },
      include: {
        course: true,
        coordinator: {
          include: {
            user: true
          }
        },
        subjects: {
          include: {
            courseSubject: true,
            teacher: {
              include: {
                user: true
              }
            }
          },
          orderBy: [
            {
              semester: 'asc'
            }
          ]
        }
      }
    })

  getAddStudentProps = async (userId: number) =>
    await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        cpf: true,
        students: {
          select: {
            id: true
          }
        }
      }
    })

  findByToken = async (classToken: string) =>
    await this.prisma.classRoom.findFirst({
      where: {
        classToken
      }
    })

  findInviteByCpf = async (cpf: number, classRoomId: number) =>
    await this.prisma.studentInvite.findFirst({
      where: {
        cpf,
        classRoomId
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

  markAccpetInvite = async (inviteId: number, studentId: number, acceptDate: Date) =>
    await this.prisma.studentInvite.update({
      where: {
        id: inviteId
      },
      data: {
        studentId,
        acceptDate
      }
    })

  findCountByUniversity = async (universityId: number) =>
    await this.prisma.classRoom.count({
      where: {
        course: {
          universityId
        }
      }
    })
}
