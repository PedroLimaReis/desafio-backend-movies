import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  id: string
  name?: string
  email?: string
  role?: 'ADMIN' | 'MEMBER'
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    role,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.update(id, {
      name,
      email,
      role,
    })

    return {
      user,
    }
  }
}
