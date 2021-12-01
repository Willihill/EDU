
import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'

import ClassRoomClassRepository from 'store/prisma/ClassRoomClassRepository'
import ClassRoomRepository from 'store/prisma/ClassRoomRepository'
import ClassRoomSubjectRepository from 'store/prisma/ClassRoomSubjectRepository'
import CourseRepository from 'store/prisma/CourseRepository'
import StudentRepository from 'store/prisma/StudentRepository'
import UserRepository from 'store/prisma/UserRepository'

import { ClassRoomClass } from '@prisma/client'
import { IncomingMessage } from 'connect'
import { maxValueArray } from 'utils/helpers/Array'
import { dateAddDays, dateAddWeeks, dateClone, dateToDb, dateToInput, getStartWeek } from 'utils/helpers/Date'

import { classRoomPushToRepoFactory } from '../factory'
import { ClassRoomPushProps, ClassroomInviteTokenProps, ClassRoomListProps, ClassRoomPushCalendarWeekDayProps } from '../types'

export const serverGetClassRoomsService = async (req: NextApiRequest): Promise<ClassRoomListProps[]> => {
  const { currentUniversityId } = getJwtPayloadService({ req })
  const classRoomRepo = new ClassRoomRepository()

  const classRooms = await classRoomRepo.findByUniversity(currentUniversityId)

  return classRooms.map(classRoom => ({
    id: classRoom.id,
    code: classRoom.code,
    courseName: classRoom.course.name,
    coordinatorName: classRoom.coordinator.user.name,
    startDate: dateToInput(classRoom.startDate),
    isActive: true,
    isEditable: true,
    isExcluding: false
  }))
}

export const serverGetClassRoomByIdService = async (req: NextApiRequest | IncomingMessage, classRoomId: number): Promise<ClassRoomPushProps> => {
  const { currentUniversityId } = getJwtPayloadService({ req })
  const classRoomRepo = new ClassRoomRepository()
  const classRoomClassRepo = new ClassRoomClassRepository()
  const studentRepo = new StudentRepository()

  const classRoom = await classRoomRepo.findByIdUniversity(classRoomId, currentUniversityId)
  if (!classRoom) throw new Error('Turma não encontrada.')

  const classes = await classRoomClassRepo.findByClassRoom(classRoomId)

  // Grouping Calendar Weeks Number
  const weeksNumberGrouped: number[] = []
  classes
    .forEach(item => {
      const found = weeksNumberGrouped.find(i => i === item.weekNumber)
      if (found) return

      weeksNumberGrouped.push(item.weekNumber)
    })

  const maxWeekNumber = maxValueArray(weeksNumberGrouped)

  const calendarWeeksNumber: number[] = Array
    .from(Array(maxWeekNumber).keys())
    .map(i => i + 1)

  const fisrtWeekDate = dateToDb(getStartWeek(classRoom.startDate))

  const classRoomInvites = await studentRepo.findInvitesByClassRoom(classRoomId)

  return {
    id: classRoom.id,
    code: classRoom.code,
    startDate: dateToDb(classRoom.startDate),
    courseDuration: classRoom.course.duration,
    classToken: classRoom.classToken,
    calendarWeeks: calendarWeeksNumber.map(item => {
      const weekFirstDate = dateToDb(getStartWeek(dateAddWeeks(fisrtWeekDate, item - 1)))

      // Sunday
      const sundayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 0)

      const sunday: ClassRoomPushCalendarWeekDayProps = {
        date: weekFirstDate,
        weekDay: 0,
        classes: sundayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      // Monday
      const mondayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 1)

      const monday: ClassRoomPushCalendarWeekDayProps = {
        date: dateToDb(dateAddDays(weekFirstDate, 1)),
        weekDay: 1,
        classes: mondayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      // Tuesday
      const tuesdayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 2)

      const tuesday: ClassRoomPushCalendarWeekDayProps = {
        date: dateToDb(dateAddDays(weekFirstDate, 2)),
        weekDay: 2,
        classes: tuesdayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      // Tuesday
      const wednesdayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 3)

      const wednesday: ClassRoomPushCalendarWeekDayProps = {
        date: dateToDb(dateAddDays(weekFirstDate, 3)),
        weekDay: 3,
        classes: wednesdayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      // Tuesday
      const thursdayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 4)

      const thursday: ClassRoomPushCalendarWeekDayProps = {
        date: dateToDb(dateAddDays(weekFirstDate, 4)),
        weekDay: 4,
        classes: thursdayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      // Friday
      const fridayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 5)

      const friday: ClassRoomPushCalendarWeekDayProps = {
        date: dateToDb(dateAddDays(weekFirstDate, 5)),
        weekDay: 5,
        classes: fridayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      // Friday
      const saturdayClasses = classes
        .filter(i => i.weekNumber === item && i.weekDay === 6)

      const saturday: ClassRoomPushCalendarWeekDayProps = {
        date: dateToDb(dateAddDays(weekFirstDate, 6)),
        weekDay: 6,
        classes: saturdayClasses.map(i => ({
          id: i.id,
          courseSubject: {
            id: i.classRoomSubject.courseSubject.id,
            name: i.classRoomSubject.courseSubject.name
          },
          startAt: i.startAt,
          endAt: i.endAt
        }))
      }

      return {
        weekNumber: item,
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
      }
    }),
    course: {
      id: classRoom.course.id,
      name: classRoom.course.name
    },
    coordinator: {
      id: classRoom.coordinatorId,
      name: classRoom.coordinator.user.name
    },
    subjects: classRoom.subjects.map(subject => ({
      id: subject.id,
      semester: subject.semester,
      teacher: {
        id: subject.teacher.id,
        name: subject.teacher.user.name
      },
      courseSubject: {
        id: subject.courseSubject.id,
        name: subject.courseSubject.name
      }
    })),
    studentInvitees: classRoomInvites.map(item => ({
      id: item.id,
      CPF: item.cpf,
      acceptAt: dateToDb(item.acceptDate),
      student: {
        id: item.studentId ?? 0,
        name: item.student?.user.name ?? ''
      },
      isAccepted: item.acceptDate !== null
    }))
  }
}

export const serverPushClassRoomService = async ({ body }: NextApiRequest) => {
  const classRoomPush: ClassRoomPushProps = body
  const classRoomSubjectRepo = new ClassRoomSubjectRepository()
  const studentRepo = new StudentRepository()
  const existingCourse = await new CourseRepository().findCourseById(classRoomPush.course.id)

  if (!existingCourse) throw new Error('O curso infomado não está registrado.')

  const classRoom = classRoomPushToRepoFactory(classRoomPush)

  const { id: classRoomId } = await new ClassRoomRepository().pushSet({
    ...classRoom,
    classToken: !classRoomPush.id
      ? generateClassToken()
      : classRoomPush.classToken
  })

  const { subjects } = classRoomPush

  const subjectsIdToNotDelete = subjects
    .filter(i => i.id)
    .map(i => i.id)

  await classRoomSubjectRepo.deleteNotRange(subjectsIdToNotDelete, classRoomId)
  const subjectsCreated = await classRoomSubjectRepo.pushSetRange(subjects.map(i => (
    {
      id: i.id,
      classRoomId: classRoomId,
      courseSubjectId: i.courseSubject.id,
      semester: i.semester,
      teacherId: i.teacher.id
    })))

  // Classes
  const { calendarWeeks } = classRoomPush
  const classRoomClassRepo = new ClassRoomClassRepository()

  const classRoomClasses: ClassRoomClass[] = []

  // Build Class list data
  calendarWeeks.forEach(calendarWeek => {
    // Sunday classes
    const sundayClasses: ClassRoomClass[] = calendarWeek.sunday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.sunday.weekDay,
          date: dateClone(calendarWeek.sunday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...sundayClasses)

    // Monday classes
    const mondayClasses: ClassRoomClass[] = calendarWeek.monday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.monday.weekDay,
          date: dateClone(calendarWeek.monday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...mondayClasses)

    // Tuesday classes
    const tuesdayClasses: ClassRoomClass[] = calendarWeek.tuesday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.tuesday.weekDay,
          date: dateClone(calendarWeek.tuesday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...tuesdayClasses)

    // Wednesday classes
    const wednesdayClasses: ClassRoomClass[] = calendarWeek.wednesday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.wednesday.weekDay,
          date: dateClone(calendarWeek.wednesday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...wednesdayClasses)

    // Thursday classes
    const thursdayClasses: ClassRoomClass[] = calendarWeek.thursday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.thursday.weekDay,
          date: dateClone(calendarWeek.thursday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...thursdayClasses)

    // Friday classes
    const fridayClasses: ClassRoomClass[] = calendarWeek.friday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.friday.weekDay,
          date: dateClone(calendarWeek.friday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...fridayClasses)

    // Saturday classes
    const saturdayClasses: ClassRoomClass[] = calendarWeek.saturday.classes
      .map(weekDayClass => {
        const classRoomSubject = subjectsCreated.find(i => i.courseSubjectId === weekDayClass.courseSubject.id)
        if (!classRoomSubject) throw new Error('Conflito de aulas com as materias da turma')

        return {
          id: weekDayClass.id,
          weekNumber: calendarWeek.weekNumber,
          weekDay: calendarWeek.saturday.weekDay,
          date: dateClone(calendarWeek.saturday.date) ?? new Date(),
          startAt: weekDayClass.startAt,
          endAt: weekDayClass.endAt,
          classRoomSubjectId: classRoomSubject.id
        }
      })

    classRoomClasses.push(...saturdayClasses)
  })

  const classesIdToNotDelete = classRoomClasses
    .filter(i => i.id)
    .map(i => i.id)

  await classRoomClassRepo.deleteNotRange(classesIdToNotDelete, classRoomId)
  await classRoomClassRepo.pushSetRange(classRoomClasses)

  // Students Invitees
  const { studentInvitees } = classRoomPush
  const inviteesIdToNotDelete = studentInvitees
    .filter(i => i.id)
    .map(i => i.id)

  await studentRepo.deleteNotRange(inviteesIdToNotDelete, classRoomId)
  await studentRepo.pushSetRange(studentInvitees.map(i => ({
    id: i.id,
    cpf: i.CPF,
    classRoomId: classRoomId
  })))
}

const generateClassToken = () => '_' + Math.random().toString(36).substr(2, 9)

export const serverAddStudentToClassRoomService = async (req: NextApiRequest) => {
  const classToken = req.query.classToken.toString()
  const tokenPayload = getJwtPayloadService({ req })

  const studantRepo = new StudentRepository()
  const classRoomRepo = new ClassRoomRepository()

  const classRoom = await classRoomRepo.findByToken(classToken)
  const user = await new UserRepository().findById(tokenPayload.userId)

  if (!classRoom) throw new Error('Token inválido.')
  if (!user) throw new Error('Token inválido.')

  const userInvited = await classRoomRepo.findInviteByCpf(user.cpf, classRoom.id)
  if (!userInvited) throw new Error('Você não está autorizado à participar desta turma.')

  const userAlreadyAcceptInvite = await studantRepo.findByUserClassRoom(user.id, classRoom.id)
  if (userAlreadyAcceptInvite) throw new Error('Você já participa desta turma.')

  const studantCreated = await studantRepo.create({
    classRoomId: classRoom.id,
    userId: user.id
  })

  await classRoomRepo.markAccpetInvite(userInvited.id, studantCreated.id, new Date())
}

export const serverGetClassroomInviteDataService = async (classToken: string): Promise<ClassroomInviteTokenProps> => {
  const classRoomData = await new ClassRoomRepository().getInviteData(classToken)
  if (!classRoomData) throw new Error('Token inválido')

  return {
    token: classToken,
    course: {
      id: classRoomData.course.id,
      name: classRoomData.course.name
    },
    university: {
      id: classRoomData.course.university.id,
      fantasyName: classRoomData.course.university.fantasyName
    }
  }
}
