import { MoviesRepository } from '@/repositories/movies-repository'
import { MovieReview } from '@prisma/client'

interface RateMovieUseCaseRequest {
  movieId: string
  userId: string
  rating: number
  comment?: string
}

interface RateMovieUseCaseResponse {
  movieReview: MovieReview
}

export class RateMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    movieId,
    userId,
    rating,
    comment,
  }: RateMovieUseCaseRequest): Promise<RateMovieUseCaseResponse> {
    const movieReview = await this.moviesRepository.rate({
      movieId,
      userId,
      rating,
      comment,
    })

    return {
      movieReview,
    }
  }
}
