import { MoviesRepository } from '@/repositories/movies-repository'
import { Movie } from '@prisma/client'

interface CreateMovieUseCaseRequest {
  name: string
  description: string
  genres: string[]
  releaseDate: Date | string
  directors: string[]
  actors: string[]
}

interface CreateMovieUseCaseResponse {
  movie: Movie
}

export class CreateMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    name,
    description,
    genres,
    releaseDate,
    directors,
    actors,
  }: CreateMovieUseCaseRequest): Promise<CreateMovieUseCaseResponse> {
    const movie = await this.moviesRepository.create({
      name,
      description,
      genres,
      releaseDate,
      directors,
      actors,
    })

    return {
      movie,
    }
  }
}
