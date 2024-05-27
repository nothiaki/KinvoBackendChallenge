import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient()

export async function deleteTransaction(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }

    const data = await prisma.transaction.delete({ where: { id } })

    //update finance balance: remove transaction amount
    await prisma.finance.update({ where: { id: data.financeId }, data: { balance: { decrement: data.amount } } })

    return reply.status(204).send({ message: 'Transaction deleted succesfully' })

  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return reply.status(404).send({ message: 'Transaction not found' })
    }

    return reply.status(520).send({ message: 'Unknown error' })
  }
}
