import fastify from 'fastify';

const app = fastify()

app.get('/hi', () => {
  console.log('hello')
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3000
}, () => {
  console.log('HTTP Server Up')
})
