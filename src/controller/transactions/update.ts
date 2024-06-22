import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError, z } from 'zod'

const prisma = new PrismaClient()

const payloadSchema = z.object({
  id: z.string().cuid(),
  newAmount: z.number().safe(),
  financeId: z.string().cuid()
})

export async function update(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, newAmount, financeId } = payloadSchema.parse(request.body)

    const transaction = await prisma.transaction.findUnique({ where: { id } })

    const updatedTransaction = await prisma.transaction.update({ where: { id }, data: { amount: newAmount } })

    const finance = await prisma.finance.update({
      where: { id: financeId },
      data: {
        balance: {
          decrement: +transaction!.amount - newAmount
        }
      }
    })

    return reply.status(200).send({
      updatedTransaction: {
        id: updatedTransaction.id,
        amount: +updatedTransaction.amount,
        transactionDate: updatedTransaction.transactionDate,
        financeId: updatedTransaction.financeId
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

    if (error instanceof PrismaClientKnownRequestError) {
      return reply.status(404).send({ message: 'Invalid data sent' })
    }

    return reply.status(520).send({ message: 'Unknown error' })
  }
}
