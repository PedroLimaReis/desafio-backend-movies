import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserUseCase } from '@/use-cases/users/factories'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(['ADMIN', 'MEMBER']).optional(),
})

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)
  const { name, email, role } = bodySchema.parse(request.body)

  const updateUserUseCase = makeUpdateUserUseCase()

  await updateUserUseCase.execute({
    id,
    name,
    email,
    role,
  })

  return reply.status(200).send()
}
