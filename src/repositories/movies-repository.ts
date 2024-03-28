import {
  ActorOnMovie,
  DirectorOnMovie,
  Genre,
  Movie,
  MovieReview,
  Prisma,
} from '@prisma/client'

export interface CreateMovieData
  extends Omit<Prisma.MovieCreateInput, 'genres' | 'directors' | 'actors'> {
  genres: string[]
  directors: string[]
  actors: string[]
}

export interface RateMovieData {
  movieId: string
  userId: string
  rating: number
  comment?: string
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  directors: DirectorOnMovie[]
  actors: ActorOnMovie[]
  averageRating: number
}

export interface MoviesRepository {
  findById(id: string): Promise<Movie | null>
  findDetailsById(id: string): Promise<MovieDetails | null>
  searchMany(
    query: {
      name?: string
      genres?: string[]
      directors?: string[]
      actors?: string[]
    },
    page: number,
  ): Promise<Movie[]>
  create(data: CreateMovieData): Promise<Movie>
  rate(data: RateMovieData): Promise<MovieReview>
}
