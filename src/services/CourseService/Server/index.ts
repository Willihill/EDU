import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'

import CourseRepository from 'store/prisma/CourseRepository'
import CourseSubjectRepository from 'store/prisma/CourseSubjectRepository'

import { factoryDataAdapter } from 'utils/api'
import { parseNumeric } from 'utils/helpers/Number'

import { coursePropsToListFactory, courseSubjectToListFactory } from '../factory'
import { CourseListFilters, CoursePushProps } from '../types'
import { createCourseHandleError } from './error'

export const serverGetCoursesService = async (req: NextApiRequest) => {
  const filters: CourseListFilters = req.query
  const { currentUniversityId } = getJwtPayloadService({ req })
  const courses = await new CourseRepository().findCoursesByUniversity(currentUniversityId, filters)

  return factoryDataAdapter(courses, coursePropsToListFactory)
}

// CourseSubjectListProps
export const serverGetCourseSubjectsService = async (req: NextApiRequest) => {
  const courseId = parseNumeric(req.query.id as string)
  const subjects = await new CourseSubjectRepository().findByCourse(courseId)

  return factoryDataAdapter(subjects, courseSubjectToListFactory)
}

export const serverGetCourseByIdService = async (id: number): Promise<CoursePushProps> => {
  const courseData = await new CourseRepository().findById(id)
  if (!courseData) throw new Error('Curso não encontrado')

  return {
    id: courseData.id,
    name: courseData.name,
    duration: courseData.duration,
    subjects: courseData.courseSubjects
      .map(i => ({
        id: i.id,
        name: i.name,
        isActive: true
      }))
  }
}

export const serverPushCourseService = async (req: NextApiRequest) => {
  const coursePush: CoursePushProps = req.body
  const { subjects, ...coursePushData } = coursePush
  const { currentUniversityId } = getJwtPayloadService({ req })

  createCourseHandleError(coursePush)

  const courseRepo = new CourseRepository()
  const courseSubjectRepo = new CourseSubjectRepository()

  // Creating validarions
  if (!coursePushData.id) {
    const validUniqCourse = await courseRepo.findCourseUniversityByName(coursePush.name, currentUniversityId)
    if (validUniqCourse) throw new Error('Já existe um curso com o nome informado.')
  }

  const { id: courseId } = await courseRepo.pushSet({
    ...coursePushData,
    universityId: currentUniversityId
  })

  const courseSubjectsIdToNotDelete = subjects
    .filter(i => i.id)
    .map(i => i.id)

  await courseSubjectRepo.deleteNotRange(courseSubjectsIdToNotDelete, courseId)
  await courseSubjectRepo.pushSetRange(subjects.map(i => ({ id: i.id, name: i.name, courseId: courseId })))
}
