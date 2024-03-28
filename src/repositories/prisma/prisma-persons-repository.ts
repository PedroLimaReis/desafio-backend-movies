import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { PersonsRepository } from '../persons-repository'

export class PrismaPersonsRepository implements PersonsRepository {
  async create(data: Prisma.PersonCreateInput) {
    const person = await prisma.person.create({
      data,
    })

    return person
  }

  async searchMany(query: string, page: number) {
    const persons = await prisma.person.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return persons
  }
}
