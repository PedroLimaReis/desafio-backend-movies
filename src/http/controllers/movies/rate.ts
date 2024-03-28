import { makeRateMovieUseCase } from '@/use-cases/movies/factories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

const bodySchema = z.object({
  rating: z.number().int().min(0).max(4),
  comment: z.string().optional(),
})

export async function rate(request: FastifyRequest, reply: FastifyReply) {
  const { id: movieId } = paramsSchema.parse(request.params)
  const { rating, comment } = bodySchema.parse(request.body)
  const userId = request.user.sub

  const rateMovieUseCase = makeRateMovieUseCase()

  await rateMovieUseCase.execute({
    movieId,
    userId,
    rating,
    comment,
  })

  return reply.status(201).send()
}
