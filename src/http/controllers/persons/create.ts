import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePersonUseCase } from '@/use-cases/persons/factories'

const bodySchema = z.object({
  name: z.string(),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name } = bodySchema.parse(request.body)

  const createPersonUseCase = makeCreatePersonUseCase()

  await createPersonUseCase.execute({
    name,
  })

  return reply.status(201).send()
}
