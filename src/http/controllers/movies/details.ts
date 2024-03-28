import { makeFetchMovieDetailsUseCase } from '@/use-cases/movies/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const { id: movieId } = paramsSchema.parse(request.params)

  const fetchMovieDetailsUseCase = makeFetchMovieDetailsUseCase()

  await fetchMovieDetailsUseCase.execute({
    movieId,
  })

  return reply.status(201).send()
}
