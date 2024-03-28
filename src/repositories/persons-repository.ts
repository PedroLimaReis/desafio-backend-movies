import { Prisma, Person } from '@prisma/client'

export interface PersonsRepository {
  create(data: Prisma.PersonCreateInput): Promise<Person>
  searchMany(query: string, page: number): Promise<Person[]>
}
