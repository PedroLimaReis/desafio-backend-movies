import { PersonsRepository } from '@/repositories/persons-repository'
import { Person } from '@prisma/client'

interface SearchPersonsUseCaseRequest {
  name: string
  page: number
}

interface SearchPersonsUseCaseResponse {
  persons: Person[]
}

export class SearchPersonsUseCase {
  constructor(private personsRepository: PersonsRepository) {}

  async execute({
    name,
    page,
  }: SearchPersonsUseCaseRequest): Promise<SearchPersonsUseCaseResponse> {
    const persons = await this.personsRepository.searchMany(name, page)

    return {
      persons,
    }
  }
}
