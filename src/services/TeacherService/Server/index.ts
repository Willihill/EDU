import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'

import ClassRoomClassRepository from 'store/prisma/ClassRoomClassRepository'
import ClassRoomSubjectRepository from 'store/prisma/ClassRoomSubjectRepository'
import TaskItemResponseRepository from 'store/prisma/TaskItemResponseRepository'
import TaskRepository from 'store/prisma/TaskRepository'

import { WeekDayList } from 'utils/common/constants'
import { dateClone, dateToDb, getEndMonth } from 'utils/helpers/Date'

import { TeacherClassRoomSubjectListProps, TeacherMonthClassListProps, TeacherTaskListProps } from '../types'

export const serverGetTeacherClassRoomSubjectsService = async (req: NextApiRequest) => {
  const { userId, currentUniversityId } = getJwtPayloadService({ req })

  const classRoomSubjects = await new ClassRoomSubjectRepository().findTeacherSubjectsByUniversity(userId, currentUniversityId)

  return classRoomSubjects.map<TeacherClassRoomSubjectListProps>(item => ({
    id: item.id,
    classRoomId: item.classRoomId,
    subjectName: item.courseSubject.name,
    courseName: item.courseSubject.course.name
  }))
}

export const serverGetTeacherMonthClassesService = async (req: NextApiRequest) => {
  const { userId, currentUniversityId } = getJwtPayloadService({ req })

  const startDate = dateClone(new Date())
  const lastMonthDate = dateClone(getEndMonth(new Date()))
  const classes = await new ClassRoomClassRepository().findTeacherMonthClassesByUniversity(userId, currentUniversityId, startDate, lastMonthDate)

  return classes.map<TeacherMonthClassListProps>(item => ({
    id: item.id,
    weekDayName: WeekDayList[item.weekDay],
    date: dateToDb(item.date),
    startAt: item.startAt,
    endAt: item.endAt,
    subjectName: item.classRoomSubject.courseSubject.name,
    courseName: item.classRoomSubject.courseSubject.course.name
  }))
}

export const serverGetTeacherTasksService = async (req: NextApiRequest) => {
  const { userId, currentUniversityId } = getJwtPayloadService({ req })

  const tasks = await new TaskRepository().findTeacherTasksByUniversity(userId, currentUniversityId)

  return await Promise.all(
    tasks.map<Promise<TeacherTaskListProps>>(async item => {
      const responseCount = await new TaskItemResponseRepository().findCountByTask(item.id)

      return {
        id: item.id,
        title: item.description,
        startline: dateToDb(item.startline),
        deadline: dateToDb(item.deadline),
        isDone: responseCount > 0,
        canViewResult: item.viewAnswer,
        responseCount: responseCount,
        courseName: item.classRoomSubject.courseSubject.course.name,
        classRoomSubject: {
          id: item.classRoomSubject.id,
          name: item.classRoomSubject.courseSubject.name
        },
        status: responseCount > 0
          ? 2
          : item.deadline > new Date()
            ? 1
            : 3
      }
    })
  )
}
