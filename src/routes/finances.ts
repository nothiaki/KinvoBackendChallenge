import { FastifyInstance } from 'fastify'
import * as financesController from '../controller/finances/index'

const endpoint: string = '/finances'

export async function finances(app: FastifyInstance) {
  app.get(endpoint, financesController.getMany)
  app.get(`${endpoint}/:id`, financesController.getUnique)
}
