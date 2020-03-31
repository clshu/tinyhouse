import express from 'express'

const app = express()
const PORT = process.env.NODE_ENV || 9000

const one = 1
const two = 2

app.get('/', (_req, res) => {
  res.send(`1 + 2 = ${one + two}`)
})

app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))
