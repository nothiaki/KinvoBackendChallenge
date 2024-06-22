import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

const prisma = new PrismaClient()

export async function many(request: FastifyRequest, reply: FastifyReply) {
  const finances = await prisma.finance.findMany()

  const data = finances.map(finance => {
    return {
      ...finance,
      balance: Number(finance.balance)
    }
  })

  return reply.status(200).send(data)
}
