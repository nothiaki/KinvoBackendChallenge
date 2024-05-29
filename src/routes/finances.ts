import { FastifyInstance } from 'fastify'
import * as financesController from '../controller/finances/index'

const endpoint: string = '/finances'

export async function finances(app: FastifyInstance) {
  app.get(endpoint, financesController.many)
  app.get(`${endpoint}/:id`, financesController.unique)
  app.post(endpoint, financesController.create)
  app.delete(`${endpoint}/:id`, financesController.del)
}
