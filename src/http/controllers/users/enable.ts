import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEnableUserUseCase } from '@/use-cases/users/factories'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  enabled: z.boolean(),
})

export async function enable(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)
  const { enabled } = bodySchema.parse(request.body)

  const enableUserUseCase = makeEnableUserUseCase()

  await enableUserUseCase.execute({
    id,
    enabled,
  })

  return reply.status(200).send()
}
