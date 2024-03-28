import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function personsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  /** Authenticated */
  app.get('/persons/search', search)

  /** Authenticated Admin */
  app.post('/persons', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
