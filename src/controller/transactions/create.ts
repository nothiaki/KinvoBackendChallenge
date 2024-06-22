import { PrismaClient } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError, z } from 'zod'

const prisma = new PrismaClient()

const payloadSchema = z.object({
  amount: z.number().safe(),
  financeId: z.string().cuid()
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { amount, financeId } = payloadSchema.parse(request.body)

    if (amount == 0) return reply.status(400).send({ message: 'Expected amount different than 0' })

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        financeId
      }
    })

    const finance = await prisma.finance.update({
      where: {
        id: financeId
      },
      data: {
        balance: {
          increment: amount
        }
      }
    })

    return reply.status(201).send({
      message: 'Transaction made successfully',
      transaction: {
        id: transaction.id,
        amount: +transaction.amount,
        transactionDate: transaction.transactionDate,
        financeId: transaction.financeId
      },
      finance: {
        id: finance.id,
        balance: +finance.balance
      }
    })

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: error.issues[0].message })
    }

    return reply.status(520).send({ message: error })
  }
}
