import { PersonsRepository } from '@/repositories/persons-repository'
import { Person } from '@prisma/client'

interface CreatePersonUseCaseRequest {
  name: string
}

interface CreatePersonUseCaseResponse {
  person: Person
}

export class CreatePersonUseCase {
  constructor(private personsRepository: PersonsRepository) {}

  async execute({
    name,
  }: CreatePersonUseCaseRequest): Promise<CreatePersonUseCaseResponse> {
    const person = await this.personsRepository.create({
      name,
    })

    return {
      person,
    }
  }
}
