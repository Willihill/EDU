import { UserSignUpProps } from 'services/AuthService/types'

import { User } from '@prisma/client'

import Repository from '../repository'

export default class UserRepository extends Repository {
  getUserByLogin = async (login: string) =>
    await this.prisma
      .user
      .findUnique({
        where: {
          login: login
        }
      })

  createUser = async (newUser: UserSignUpProps) =>
    await this.prisma.user.create({
      data: {
        name: newUser.name,
        login: newUser.login,
        password: newUser.password,
        cpf: newUser.cpf,
        createdAt: new Date(),
        email: newUser.email
      }
    })

  findById = async (id: number) =>
    await this.prisma.user.findFirst({
      where: {
        id
      }
    })

  validateCreateUser = async (newUser: UserSignUpProps) => {
    const existingUsers: User[] | null = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            cpf: newUser.cpf
          },
          {
            email: newUser.email
          },
          {
            login: newUser.login
          }
        ]
      }
    })
    return existingUsers
  }
}
