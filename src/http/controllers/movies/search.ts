import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchMoviesUseCase } from '@/use-cases/movies/factories'

const querySchema = z.object({
  name: z.string().optional(),
  genres: z.array(z.string().uuid()).optional(),
  directors: z.array(z.string().uuid()).optional(),
  actors: z.array(z.string().uuid()).optional(),
  page: z.coerce.number().min(1).default(1),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { name, genres, directors, actors, page } = querySchema.parse(
    request.query,
  )

  const searchMoviesUseCase = makeSearchMoviesUseCase()

  const { movies } = await searchMoviesUseCase.execute({
    name,
    genres,
    directors,
    actors,
    page,
  })

  return reply.status(200).send({
    movies,
  })
}
