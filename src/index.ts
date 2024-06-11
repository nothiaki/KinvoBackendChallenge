import fastify from 'fastify'
import { transactions } from './routes/transactions'
import { finances } from './routes/finances'

const app = fastify()

app.register(transactions)
app.register(finances)

app.listen({
  host: '0.0.0.0',
  port: 3000
}, () => {
  console.log('HTTP Server Up')
})
