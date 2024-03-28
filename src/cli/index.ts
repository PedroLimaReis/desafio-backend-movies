import { Command } from 'commander'

import { createUser } from './commands/create-user'

const program = new Command()

program
  .name('movies-cli')
  .description('CLI to Movies API utilities')
  .version('1.0.0')

program
  .command('create-user')
  .description('Creates an user with the provided information')
  .action(createUser)

program.parse()
