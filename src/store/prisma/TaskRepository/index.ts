
import { Task } from '.prisma/client'

import Repository from '../repository'

export default class TaskRepository extends Repository {
  findById = async (id: number) =>
    await this.prisma.task.findFirst({
      where: {
        id
      },
      include: {
        taskItems: { include: { taskItemImages: true, taskItemOptions: true } }
      }
    })

  findResponseById = async (id: number, studentId: number) =>
    await this.prisma.task.findFirst({
      where: {
        id
      },
      include: {
        taskItems: { include: { taskItemImages: true, taskItemOptions: true, taskItemResponse: { where: { studentId: studentId } } } }
      }
    })

  pushSet = async ({ id, ...form }: Task) =>
    await this.prisma.task.upsert({
      create: form,
      update: form,
      where: { id }
    })

  listTasks = async (classRoomSubjectId: number) =>
    await this.prisma.task.findMany({
      select: {
        id: true,
        description: true,
        deadline: true,
        viewAnswer: true,
        taskItems: true
      },
      where: {
        classRoomSubjectId
      }
    })

  findByClassRoomSubject = async (classRoomSubjectId: number) =>
    await this.prisma.task.findMany({
      where: {
        classRoomSubjectId
      },
      orderBy: {
        deadline: 'desc'
      }
    })

  findStudentTasksByUniversity = async (userId: number, universityId: number) =>
    await this.prisma.task.findMany({
      where: {
        classRoomSubject: {
          classRoom: {
            course: {
              universityId
            },
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
        startline: 'asc'
      }
    })

  findTeacherTasksByUniversity = async (userId: number, universityId: number) =>
    await this.prisma.task.findMany({
      where: {
        classRoomSubject: {
          teacher: {
            userId
          },
          classRoom: {
            course: {
              universityId
            }
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
        startline: 'asc'
      }
    })
}
