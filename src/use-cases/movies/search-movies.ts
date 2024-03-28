import { MoviesRepository } from '@/repositories/movies-repository'
import { Movie } from '@prisma/client'

interface SearchMoviesUseCaseRequest {
  name?: string
  genres?: string[]
  directors?: string[]
  actors?: string[]
  page: number
}

interface SearchMoviesUseCaseResponse {
  movies: Movie[]
}

export class SearchMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    name,
    genres,
    directors,
    actors,
    page,
  }: SearchMoviesUseCaseRequest): Promise<SearchMoviesUseCaseResponse> {
    const movies = await this.moviesRepository.searchMany(
      {
        name,
        genres,
        directors,
        actors,
      },
      page,
    )

    return {
      movies,
    }
  }
}
