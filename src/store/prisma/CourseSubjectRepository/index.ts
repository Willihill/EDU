import { CourseSubject } from '@prisma/client'

import Repository from '../repository'

export default class CourseSubjectRepository extends Repository {
  createCourseSubject = async (courseSubject: CourseSubject) =>
    await this.prisma.courseSubject.create({
      data: courseSubject
    })

  deleteNotRange = async (ids: number[], courseId: number) =>
    await this.prisma.courseSubject.deleteMany({
      where: {
        id: {
          notIn: ids
        },
        courseId: courseId
      }
    })

  updateRange = async (courseSubjects: CourseSubject[]) =>
    await Promise.all(
      courseSubjects.map(({ id, ...courseSubject }) => this.prisma.courseSubject.update({
        data: courseSubject,
        where: {
          id
        }
      }))
    )

  createRange = async (courseSubjects: CourseSubject[]) =>
    await this.prisma.courseSubject.createMany({
      data: courseSubjects
    })

  pushSetRange = async (courseSubjects: CourseSubject[]) =>
    await Promise.all(
      courseSubjects.map(({ id, ...courseSubject }) => this.prisma.courseSubject.upsert({
        create: courseSubject,
        update: courseSubject,
        where: {
          id
        }
      }))
    )

  findByCourse = async (courseId: number) =>
    await this.prisma.courseSubject.findMany({
      where: {
        courseId
      }
    })
}
