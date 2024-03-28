import { PrismaMoviesRepository } from '@/repositories/prisma/prisma-movies-repository'
import { SearchMoviesUseCase } from './search-movies'
import { RateMovieUseCase } from './rate-movie'
import { FetchMovieDetailsUseCase } from './fetch-movie-details'
import { CreateMovieUseCase } from './create-movie'

export function makeSearchMoviesUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new SearchMoviesUseCase(moviesRepository)

  return useCase
}

export function makeRateMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new RateMovieUseCase(moviesRepository)

  return useCase
}

export function makeFetchMovieDetailsUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new FetchMovieDetailsUseCase(moviesRepository)

  return useCase
}

export function makeCreateMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const useCase = new CreateMovieUseCase(moviesRepository)

  return useCase
}
