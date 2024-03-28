import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPersonsUseCase } from '@/use-cases/persons/factories'

const querySchema = z.object({
  name: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { name, page } = querySchema.parse(request.query)

  const searchPersonsUseCase = makeSearchPersonsUseCase()

  const { persons } = await searchPersonsUseCase.execute({
    name,
    page,
  })

  return reply.status(200).send({
    persons,
  })
}
