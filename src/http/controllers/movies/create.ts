import { makeCreateMovieUseCase } from '@/use-cases/movies/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  genres: z.array(z.string()),
  releaseDate: z.date(),
  directors: z.array(z.string()),
  actors: z.array(z.string()),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, genres, releaseDate, directors, actors } =
    bodySchema.parse(request.body)

  const createMovieUseCase = makeCreateMovieUseCase()

  await createMovieUseCase.execute({
    name,
    description,
    genres,
    releaseDate,
    directors,
    actors,
  })

  return reply.status(201).send()
}
