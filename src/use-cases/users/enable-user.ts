import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface EnableUserUseCaseRequest {
  id: string
  enabled: boolean
}

interface EnableUserUseCaseResponse {
  user: User
}

export class EnableUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    enabled,
  }: EnableUserUseCaseRequest): Promise<EnableUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.update(id, {
      enabled,
    })

    return {
      user,
    }
  }
}
