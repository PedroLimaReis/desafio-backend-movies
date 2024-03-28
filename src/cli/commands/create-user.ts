import { makeRegisterUseCase } from '@/use-cases/users/factories'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { z } from 'zod'

const inputSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'MEMBER']),
})

type Input = z.infer<typeof inputSchema>

const validateField = (field: keyof Input) => (input: string) => {
  const result = inputSchema.shape[field].safeParse(input)

  if (!result.success) {
    return result.error.errors[0].message
  }

  return true
}

export async function createUser() {
  console.log(chalk.bgCyan(' Create User '))
  console.log()
  console.log(
    chalk.gray('Please provide the following information to create a new user'),
  )

  const { email, name, password, role } = await inquirer.prompt<Input>([
    {
      name: 'email',
      message: 'Email:',
      type: 'input',
      validate: validateField('email'),
    },
    {
      name: 'name',
      message: 'Name:',
      type: 'input',
      validate: validateField('name'),
    },
    {
      name: 'password',
      message: 'Password:',
      type: 'password',
      validate: validateField('password'),
    },
    {
      name: 'role',
      message: 'Role:',
      type: 'list',
      choices: ['ADMIN', 'MEMBER'],
      validate: validateField('role'),
    },
  ])

  try {
    const user = await makeRegisterUseCase().execute({
      email,
      name,
      password,
      role,
    })

    console.log(chalk.greenBright('User created!'))
    console.log(
      chalk.magenta(
        JSON.stringify(
          {
            ...user.user,
            password: '********',
          },
          null,
          2,
        ),
      ),
    )
  } catch (error) {
    console.error(
      chalk.redBright('Error creating user:'),
      error instanceof Error ? error.message : error,
    )
  }
}
