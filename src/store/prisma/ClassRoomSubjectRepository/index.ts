import { ClassRoomSubject, ClassRoomSubjectMessage } from '.prisma/client'

import Repository from '../repository'

export default class ClassRoomSubjectRepository extends Repository {
  deleteNotRange = async (ids: number[], classRoomId: number) =>
    await this.prisma.classRoomSubject.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        classRoomId
      }
    })

  pushSetRange = async (courseSubjects: ClassRoomSubject[]) =>
    await Promise.all(
      courseSubjects.map(({ id, ...courseSubject }) => this.prisma.classRoomSubject.upsert({
        create: courseSubject,
        update: courseSubject,
        where: {
          id
        }
      }))
    )

  findById = async (id: number) =>
    await this.prisma.classRoomSubject.findFirst({
      where: {
        id
      },
      include: {
        classRoom: true
      }
    })

  findByCourse = async (courseId: number) =>
    await this.prisma.courseSubject.findMany({
      where: {
        courseId
      }
    })

  findTeacherName = async (id: number) =>
    await this.prisma.classRoomSubject.findFirst({
      select: {
        courseSubject: { select: { name: true } },
        teacher: { select: { user: { select: { name: true } } } }
      },
      where: {
        id
      }
    })

  findUserSubjectsByUniversity = async (userId: number, universityId: number) =>
    await this.prisma.classRoomSubject.findMany({
      where: {
        classRoom: {
          studants: {
            some: {
              userId
            }
          },
          course: {
            universityId
          }
        }
      },
      include: {
        courseSubject: true,
        teacher: {
          include: {
            user: true
          }
        }
      }
    })

  findTeacherSubjectsByUniversity = async (userId: number, universityId: number) =>
    await this.prisma.classRoomSubject.findMany({
      where: {
        teacher: {
          userId
        },
        classRoom: {
          course: {
            universityId
          }
        }
      },
      include: {
        courseSubject: {
          include: {
            course: true
          }
        }
      }
    })

  findByIdUniversity = async (classRoomSubjectId: number, universityId: number) =>
    await this.prisma.classRoomSubject.findFirst({
      where: {
        id: classRoomSubjectId,
        classRoom: {
          course: {
            universityId
          }
        }
      },
      include: {
        courseSubject: true,
        teacher: {
          include: {
            user: true
          }
        }
      }
    })

  findMessages = async (classRoomSubjectId: number) =>
    await this.prisma.classRoomSubjectMessage.findMany({
      where: {
        classRoomSubjectId
      },
      include: {
        user: true
      },
      orderBy: {
        sendAt: 'desc'
      }
    })

  pushMessage = async (data: Omit<ClassRoomSubjectMessage, 'id'>) =>
    await this.prisma.classRoomSubjectMessage.create({
      data
    })
}
