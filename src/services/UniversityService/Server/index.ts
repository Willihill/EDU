import { NextApiRequest } from 'next'

import { getJwtPayloadService } from 'services/AuthService'
import { UserVisualizationType } from 'services/AuthService/types'

import ClassRoomRepository from 'store/prisma/ClassRoomRepository'
import StudentRepository from 'store/prisma/StudentRepository'
import TeacherRepository from 'store/prisma/TeacherRepository'
import UniversityRepository from 'store/prisma/UniversityRepository'
import UserRepository from 'store/prisma/UserRepository'

import { factoryDataAdapter } from 'utils/api'
import { dateToInput } from 'utils/helpers/Date'
import { parseNumeric } from 'utils/helpers/Number'

import { teacherToListFactory } from '../factory'
import { UniversityProps, UniversityTeacherInviteListProps, UniversityTeacherInviteProps, UniversityTeacherInvitePushProps, UniversityTeacherListFilters } from '../types'

export const serverGetUniversitiesByUserService = async (req: NextApiRequest): Promise<UniversityProps[]> => {
  const tokenPayload = getJwtPayloadService({ req })

  const adminUniversities = await new UniversityRepository().getAdminUniversitiesByUser(tokenPayload.userId)
  const teacherUniversities = await new UniversityRepository().getTeacherUniversitiesByUser(tokenPayload.userId)
  const studentUniversities = await new UniversityRepository().getStudentUniversitiesByUser(tokenPayload.userId)

  const universities: UniversityProps[] = []

  adminUniversities
    .forEach(admin => {
      const already = universities.find(i => i.id === admin.university.id)
      if (!already) universities.push({ ...admin.university, userVisualizationType: UserVisualizationType.Admin })
    })

  teacherUniversities
    .forEach(teacher => {
      const already = universities.find(i => i.id === teacher.university.id)
      if (!already) universities.push({ ...teacher.university, userVisualizationType: UserVisualizationType.Teacher })
    })

  studentUniversities
    .forEach(student => {
      const already = universities.find(i => i.id === student.classRoom.course.university.id)
      if (!already) universities.push({ ...student.classRoom.course.university, userVisualizationType: UserVisualizationType.Student })
    })

  return universities
}

export const serverGetUniversityTeacherInviteDataService = async (classToken: string): Promise<UniversityTeacherInviteProps> => {
  const universityData = await new UniversityRepository().getUniversityInviteData(classToken)
  if (!universityData) throw new Error('Token inválido')

  return {
    token: classToken,
    university: {
      id: universityData.id,
      fantasyName: universityData.fantasyName
    }
  }
}

export const serverAcceptTeacherInviteService = async (req: NextApiRequest) => {
  const classToken = req.query.token.toString()
  const tokenPayload = getJwtPayloadService({ req })

  const teacherRepo = new TeacherRepository()
  const universityRepo = new UniversityRepository()

  const university = await universityRepo.findByToken(classToken)
  const user = await new UserRepository().findById(tokenPayload.userId)

  if (!university) throw new Error('Token inválido.')
  if (!user) throw new Error('Token inválido.')

  const userInvited = await teacherRepo.findInviteByCpf(user.cpf, university.id)
  if (!userInvited) throw new Error('Você não está autorizado à participar desta universidade.')

  const userAlreadyAcceptInvite = await teacherRepo.findByUserUniversity(user.id, university.id)
  if (userAlreadyAcceptInvite) throw new Error('Você já participa desta universidade.')

  const teacherCreated = await teacherRepo.create({
    userId: user.id,
    universityId: university.id
  })

  await teacherRepo.markAccpetInvite(userInvited.id, teacherCreated.id, new Date())
}

export const serverGetUniversityTeachersService = async (req: NextApiRequest) => {
  const filters: UniversityTeacherListFilters = req.query as any
  const { currentUniversityId } = getJwtPayloadService({ req })
  const teachers = await new TeacherRepository().findByUniversity(currentUniversityId, filters)

  return factoryDataAdapter(teachers, teacherToListFactory)
}

export const serverGetUniversityTeachersInvitedService = async (req: NextApiRequest) => {
  const { currentUniversityId } = getJwtPayloadService({ req })
  const teachersInvited = await new TeacherRepository().findTeachersInvitedByUniversity(currentUniversityId)

  return teachersInvited.map<UniversityTeacherInviteListProps>(i => ({
    id: i.id,
    CPF: i.cpf,
    teacherName: i.teacher?.user?.name ?? '',
    isAccept: !!i.acceptDate,
    acceptAt: dateToInput(i.acceptDate),
    isActive: true,
    isEditable: false,
    isExcluding: false
  }))
}

export const serverDeleteUniversityTeachersInvitedService = async (req: NextApiRequest) => {
  const inviteId = parseNumeric(req.query.id.toString())
  if (!inviteId) throw new Error('Convite inválido')

  const teacherRepo = new TeacherRepository()
  await teacherRepo.deleteInvite(inviteId)
}

export const serverPostUniversityTeacherInvitedService = async (req: NextApiRequest) => {
  const inviteData: UniversityTeacherInvitePushProps = req.body
  const { currentUniversityId } = getJwtPayloadService({ req })

  const teacherRepo = new TeacherRepository()

  const userInvited = await teacherRepo.findInviteByCpf(inviteData.CPF, currentUniversityId)
  if (userInvited) throw new Error('CPF já está convidado.')

  await teacherRepo.pushInvite({
    cpf: inviteData.CPF,
    universityId: currentUniversityId,
    acceptDate: null,
    teacherId: null
  })
}

export const serverGetUniversityAmountService = async (req: NextApiRequest) => {
  const { currentUniversityId } = getJwtPayloadService({ req })

  const studentsCount = await new StudentRepository().findCountByUniversity(currentUniversityId)
  const teachersCount = await new TeacherRepository().findCountByUniversity(currentUniversityId)
  const classRoomsCount = await new ClassRoomRepository().findCountByUniversity(currentUniversityId)

  return [{
    studentsCount,
    teachersCount,
    classRoomsCount
  }]
}
