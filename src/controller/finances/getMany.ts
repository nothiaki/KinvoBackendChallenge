import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

const prisma = new PrismaClient()

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  const data = await prisma.finance.findMany()

  return reply.status(200).send(data)
}
