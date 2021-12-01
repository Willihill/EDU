import { ClassRoomClass } from '.prisma/client'

import Repository from '../repository'

export default class ClassRoomClassRepository extends Repository {
  findByClassRoom = async (classRoomId: number) =>
    await this.prisma.classRoomClass.findMany({
      where: {
        classRoomSubject: {
          classRoomId
        }
      },
      include: {
        classRoomSubject: {
          include: {
            courseSubject: true
          }
        }
      }
    })

  findByClassRoomSubject = async (classRoomSubjectId: number) =>
    await this.prisma.classRoomClass.findMany({
      where: {
        classRoomSubjectId
      },
      include: {
        classRoomSubject: {
          include: {
            courseSubject: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

  deleteNotRange = async (ids: number[], classRoomId: number) =>
    await this.prisma.classRoomClass.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        classRoomSubject: {
          classRoomId
        }
      }
    })

  pushSetRange = async (courseSubjects: ClassRoomClass[]) =>
    await Promise.all(
      courseSubjects.map(({ id, ...courseSubject }) => this.prisma.classRoomClass.upsert({
        create: courseSubject,
        update: courseSubject,
        where: {
          id
        }
      }))
    )

  findStudentMonthClassesByUniversity = async (userId: number, universityId: number, startDate: Date, endDate: Date) =>
    await this.prisma.classRoomClass.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        },
        classRoomSubject: {
          courseSubject: {
            course: {
              universityId
            }
          },
          classRoom: {
            studants: {
              some: {
                userId
              }
            }
          }
        }
      },
      include: {
        classRoomSubject: {
          include: {
            teacher: {
              include: {
                user: true
              }
            },
            courseSubject: true
          }

        }
      },
      orderBy: {
        date: 'asc'
      }
    })

  findTeacherMonthClassesByUniversity = async (userId: number, universityId: number, startDate: Date, endDate: Date) =>
    await this.prisma.classRoomClass.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        },
        classRoomSubject: {
          courseSubject: {
            course: {
              universityId
            }
          },
          teacher: {
            userId
          }
        }
      },
      include: {
        classRoomSubject: {
          include: {
            courseSubject: {
              include: {
                course: true
              }
            }
          }

        }
      },
      orderBy: {
        date: 'asc'
      }
    })
}
