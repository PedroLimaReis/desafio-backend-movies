import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient()

async function main() {
  await prisma.person.createMany({
    data: faker.helpers.multiple(() => ({ name: faker.person.fullName() }), {
      count: 250,
    }),
  })

  const persons = await prisma.person.findMany()

  await prisma.genre.createMany({
    data: [
      { name: 'Action' },
      { name: 'Adventure' },
      { name: 'Comedy' },
      { name: 'Crime' },
      { name: 'Drama' },
      { name: 'Fantasy' },
      { name: 'Historical' },
      { name: 'Horror' },
      { name: 'Mystery' },
      { name: 'Romance' },
      { name: 'Sci-Fi' },
      { name: 'Thriller' },
      { name: 'Western' },
    ],
  })

  const genres = await prisma.genre.findMany()

  const movies = []

  for (let i = 0; i < 100; i++) {
    const movie = await prisma.movie.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        releaseDate: faker.date.past(),
        genres: {
          connect: faker.helpers
            .arrayElements(genres, { min: 1, max: 3 })
            .map(({ id }) => ({ id })),
        },
        actors: {
          createMany: {
            data: faker.helpers
              .arrayElements(persons, { min: 5, max: 20 })
              .map(({ id: personId }) => ({ personId })),
          },
        },
        directors: {
          createMany: {
            data: faker.helpers
              .arrayElements(persons, { min: 1, max: 2 })
              .map(({ id: personId }) => ({ personId })),
          },
        },
      },
    })

    movies.push(movie)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
