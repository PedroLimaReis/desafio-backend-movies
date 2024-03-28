import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { refresh } from './refresh'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { update } from './update'
import { enable } from './enable'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile)

  /** Authenticated Admin */
  app.post(
    '/users',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    register,
  )
  app.put(
    '/users/:id',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    update,
  )
  app.patch(
    '/users/:id/enable',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    enable,
  )
}
