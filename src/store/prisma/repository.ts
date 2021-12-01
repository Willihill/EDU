import { PrismaClient } from '@prisma/client'

if (!global.teste) {
  global.teste = new PrismaClient()
}
const prisma: PrismaClient = global.teste

export default class Repository {
  protected readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }
}
