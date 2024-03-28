import { prisma } from '@/lib/prisma'
import {
  MoviesRepository,
  CreateMovieData,
  RateMovieData,
} from '../movies-repository'
import { MovieReview } from '@prisma/client'

export class PrismaMoviesRepository implements MoviesRepository {
  async findById(id: string) {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
    })

    return movie
  }

  async findDetailsById(id: string) {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        directors: true,
        genres: true,
      },
    })

    const rating = await prisma.movieReview.aggregate({
      where: {
        movieId: id,
      },
      _avg: {
        rating: true,
      },
    })

    const averageRating = rating._avg.rating

    if (movie === null || averageRating === null) {
      return null
    }

    return { ...movie, averageRating }
  }

  async searchMany(
    {
      name,
      genres,
      directors,
      actors,
    }: {
      name?: string
      genres?: string[]
      directors?: string[]
      actors?: string[]
    },
    page: number,
  ) {
    const movies = await prisma.movie.findMany({
      where: {
        name: {
          contains: name,
        },
        genres: {
          some: {
            id: {
              in: genres,
            },
          },
        },
        directors: {
          some: {
            personId: {
              in: directors,
            },
          },
        },
        actors: {
          some: {
            personId: {
              in: actors,
            },
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return movies
  }

  async create({ genres, directors, actors, ...data }: CreateMovieData) {
    const movie = await prisma.movie.create({
      data: {
        ...data,
        genres: {
          connect: genres.map((id) => ({ id })),
        },
        directors: {
          createMany: {
            data: directors.map((personId) => ({ personId })),
          },
        },
        actors: {
          createMany: {
            data: actors.map((personId) => ({ personId })),
          },
        },
      },
    })

    return movie
  }

  async rate({
    movieId,
    userId,
    rating,
    comment,
  }: RateMovieData): Promise<MovieReview> {
    const movieReview = await prisma.movieReview.upsert({
      where: {
        userId_movieId: {
          movieId,
          userId,
        },
      },
      create: {
        rating,
        comment,
        userId,
        movieId,
      },
      update: {
        rating,
        comment,
      },
    })

    return movieReview
  }
}
