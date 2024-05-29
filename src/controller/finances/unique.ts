import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyReply, FastifyRequest } from 'fastify'

const prisma = new PrismaClient()

export async function unique(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }

    const data = await prisma.finance.findUnique({ where: { id } })

    return reply.status(200).send(data)

  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return reply.status(404).send({ message: 'Transaction not found' })
    }

    return reply.status(520).send({ message: 'Unknown error' })
  }
}
