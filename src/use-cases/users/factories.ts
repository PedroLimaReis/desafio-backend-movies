import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from './update-user'
import { RegisterUseCase } from './register'
import { GetUserProfileUseCase } from './get-user-profile'
import { AuthenticateUseCase } from './authenticate'
import { EnableUserUseCase } from './enable-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUserUseCase = new UpdateUserUseCase(usersRepository)

  return updateUserUseCase
}

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}

export function makeEnableUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const enableUserUseCase = new EnableUserUseCase(usersRepository)

  return enableUserUseCase
}
