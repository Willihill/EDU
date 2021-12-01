import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'

import ClassRoomClassRepository from 'store/prisma/ClassRoomClassRepository'
import ClassRoomSubjectRepository from 'store/prisma/ClassRoomSubjectRepository'
import TaskItemResponseRepository from 'store/prisma/TaskItemResponseRepository'
import TaskRepository from 'store/prisma/TaskRepository'

import { WeekDayList } from 'utils/common/constants'
import { dateClone, dateToDb, getEndMonth } from 'utils/helpers/Date'

import { StudentMonthClassListProps, StudentClassRoomSubjectListProps, StudentTaskListProps } from '../types'

export const serverGetStudentClassRoomSubjectsService = async (req: NextApiRequest) => {
  const { userId, currentUniversityId } = getJwtPayloadService({ req })

  const classRoomSubjects = await new ClassRoomSubjectRepository().findUserSubjectsByUniversity(userId, currentUniversityId)

  return classRoomSubjects.map<StudentClassRoomSubjectListProps>(item => ({
    id: item.id,
    classRoomId: item.classRoomId,
    subjectName: item.courseSubject.name,
    teacherName: item.teacher.user.name
  }))
}

export const serverGetStudentMonthClassesService = async (req: NextApiRequest) => {
  const { userId, currentUniversityId } = getJwtPayloadService({ req })

  const startDate = dateClone(new Date())
  const lastMonthDate = dateClone(getEndMonth(new Date()))
  const classes = await new ClassRoomClassRepository().findStudentMonthClassesByUniversity(userId, currentUniversityId, startDate, lastMonthDate)

  return classes.map<StudentMonthClassListProps>(item => ({
    id: item.id,
    weekDayName: WeekDayList[item.weekDay],
    date: dateToDb(item.date),
    startAt: item.startAt,
    endAt: item.endAt,
    subjectName: item.classRoomSubject.courseSubject.name,
    teacherName: item.classRoomSubject.teacher.user.name
  }))
}

export const serverGetStudentTasksService = async (req: NextApiRequest) => {
  const { userId, currentUniversityId } = getJwtPayloadService({ req })

  const tasks = await new TaskRepository().findStudentTasksByUniversity(userId, currentUniversityId)

  return await Promise.all(
    tasks.map<Promise<StudentTaskListProps>>(async item => {
      const responseCount = await new TaskItemResponseRepository().findUserResponseByTask(userId, item.id)

      return {
        id: item.id,
        title: item.description,
        startline: dateToDb(item.startline),
        deadline: dateToDb(item.deadline),
        isDone: responseCount > 0,
        canViewResult: item.viewAnswer,
        classRoomSubject: {
          id: item.classRoomSubject.id,
          name: item.classRoomSubject.courseSubject.name
        },
        teacherName: item.classRoomSubject.teacher.user.name,
        status: responseCount > 0
          ? 2
          : item.deadline > new Date()
            ? 1
            : 3
      }
    })
  )
}
