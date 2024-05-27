import fastify from 'fastify';
import { transactions } from './routes/transaction';

const app = fastify()

app.register(transactions)

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3000
}, () => {
  console.log('HTTP Server Up')
})
