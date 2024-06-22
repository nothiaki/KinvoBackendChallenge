import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'

const prisma = new PrismaClient()

const querySchema = z.object({
  page: z.coerce.number().positive(),
  limit: z.coerce.number().positive(),
  start: z.string().date().optional(),
  end: z.string().date().optional()
})

export async function many(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { page, limit, start, end } = querySchema.parse(request.query)
    const { financeId } = request.params as { financeId: string }

    const transactions = await prisma.transaction.findMany({
      skip: page,
      take: limit,
      where: {
        financeId,
        ...(start && end && {
          transactionDate: {
            gte: `${start}T00:00:00.000Z`,
            lte: `${end}T00:00:00.000Z`
          }
        })
      }
    })

    const data = transactions.map(transaction => {
      return {
        ...transaction,
        amount: Number(transaction.amount)
      }
    })

    return reply.status(200).send(data)

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues[0].message })
    }

    return reply.status(520).send({ message: 'Unknown error' })
  }
}
