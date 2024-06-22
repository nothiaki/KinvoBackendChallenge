import { PrismaClient } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError, z } from 'zod'

const prisma = new PrismaClient()

const payloadSchema = z.object({
  balance: z.number().safe()
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { balance } = payloadSchema.parse(request.body)

    const finance = await prisma.finance.create({
      data: { balance }
    })

    return reply.status(201).send({
      message: 'Finance created successfully',
      finance: { id: finance.id, balance: +finance.balance }
    })

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues[0].message })
    }

    return reply.status(520).send({ message: 'Unknown error' })
  }
}
