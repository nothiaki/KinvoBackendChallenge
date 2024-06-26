import { FastifyInstance } from 'fastify'
import * as transactionsController from '../controller/transactions/index'

const endpoint: string = '/transactions'

export async function transactions(app: FastifyInstance) {
  app.post(endpoint, transactionsController.create)
  app.delete(`${endpoint}/:id`, transactionsController.del)
  app.put(endpoint, transactionsController.update)
  app.get(`${endpoint}/:financeId`, transactionsController.many)
}
