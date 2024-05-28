import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyRequest, FastifyReply } from 'fastify'

const prisma = new PrismaClient()

export async function deleteFinance(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }

    await prisma.transaction.deleteMany({ where: { financeId: id } })
    await prisma.finance.delete({ where: { id } })

    return reply.status(204).send()

  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return reply.status(404).send({ message: error /*'Finance not found'*/ })
    }

    return reply.status(520).send({ message: 'Unknown error' })
  }
}
