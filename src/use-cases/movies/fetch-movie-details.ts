import {
  MovieDetails,
  MoviesRepository,
} from '@/repositories/movies-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FetchMovieDetailsUseCaseRequest {
  movieId: string
}

interface FetchMovieDetailsUseCaseResponse {
  movieDetails: MovieDetails
}

export class FetchMovieDetailsUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    movieId,
  }: FetchMovieDetailsUseCaseRequest): Promise<FetchMovieDetailsUseCaseResponse> {
    const movieDetails = await this.moviesRepository.findDetailsById(movieId)

    if (!movieDetails) {
      throw new ResourceNotFoundError()
    }

    return {
      movieDetails,
    }
  }
}
