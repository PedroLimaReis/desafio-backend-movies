import { PrismaPersonsRepository } from '@/repositories/prisma/prisma-persons-repository'
import { SearchPersonsUseCase } from './search-persons'
import { CreatePersonUseCase } from './create-person'

export function makeSearchPersonsUseCase() {
  const personsRepository = new PrismaPersonsRepository()
  const useCase = new SearchPersonsUseCase(personsRepository)

  return useCase
}

export function makeCreatePersonUseCase() {
  const personsRepository = new PrismaPersonsRepository()
  const useCase = new CreatePersonUseCase(personsRepository)

  return useCase
}
