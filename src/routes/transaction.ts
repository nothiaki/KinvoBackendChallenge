import { FastifyInstance } from 'fastify'
import * as transactionsController from '../controller/transaction/index'

const endpoint: string = '/transactions'

export async function transactions(app: FastifyInstance) {
  app.post(endpoint, transactionsController.create)
}
