import { Course } from '.prisma/client'

import { CourseListFilters } from 'services/CourseService/types'

import Repository from '../repository'

export default class CourseRepository extends Repository {
  findById = async (id: number) =>
    await this.prisma.course.findFirst({
      where: {
        id
      },
      include: {
        courseSubjects: true
      }
    })

  createCourse = async (course: Course) =>
    await this.prisma.course.create({
      data: course
    })

  pushSet = async ({ id, ...course }: Course) =>
    await this.prisma.course.upsert({
      create: course,
      update: course,
      where: {
        id
      }
    })

  findCoursesByUniversity = async (universityId: number, filters?: CourseListFilters): Promise<Course[]> =>
    await this.prisma.course.findMany({
      where: {
        universityId: universityId,
        name: {
          contains: filters?.name
        }
      }
    })

  findCourseById = async (courseId: number) =>
    await this.prisma.course.findUnique({
      where: {
        id: courseId
      }
    })

  findCourseUniversityByName = async (courseName: string, universityId: number) =>
    await this.prisma.course.findFirst({
      where: {
        name: courseName,
        universityId: universityId
      }
    })
}
