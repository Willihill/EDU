import Repository from '../repository'

export default class UniversityRepository extends Repository {
  findById = async (id: number) =>
    await this.prisma.university.findFirst({
      where: {
        id
      }
    })

  getAdminUniversitiesByUser = async (userId: number) =>
    await this.prisma
      .admin
      .findMany({
        where: {
          userId
        },
        select: {
          university: true
        }
      })

  getStudentUniversitiesByUser = async (userId: number) =>
    await this.prisma
      .student
      .findMany({
        where: {
          userId: userId
        },
        select: {
          classRoom: {
            select: {
              course: {
                select: {
                  university: true
                }
              }
            }
          }
        }
      })

  getTeacherUniversitiesByUser = async (userId: number) =>
    await this.prisma
      .teacher
      .findMany({
        where: {
          userId: userId
        },
        select: {
          university: true
        }
      })

  getUniversityInviteData = async (token: string) =>
    await this.prisma.university.findFirst({
      where: {
        token
      }
    })

  findByToken = async (token: string) =>
    await this.prisma.university.findFirst({
      where: {
        token
      }
    })
}
