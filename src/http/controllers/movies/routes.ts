import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { rate } from './rate'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { details } from './details'

export async function moviesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  /** Authenticated */
  app.get('/movies/search', search)
  app.get('/movies/:id', details)

  /** Authenticated Member */
  app.post('/movies/:id/rate', { onRequest: [verifyUserRole('MEMBER')] }, rate)

  /** Authenticated Admin */
  app.post('/movies', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
