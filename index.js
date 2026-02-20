const express = require('express')
const client = require('prom-client')

const app = express()

// Collect default metrics (CPU, memory, event loop, etc)
client.collectDefaultMetrics()

// Custom metric example
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'status'],
})

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer()
  res.on('finish', () => {
    end({ method: req.method, route: req.path, status: res.statusCode })
  })
  next()
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

app.listen(3000)
