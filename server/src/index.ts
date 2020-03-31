import express from 'express'

const app = express()
const PORT = process.env.NODE_ENV || 9000

const one: number = 1
const two: number = 2

app.get('/', (req, res) => {
  res.send(`1 + 2 = ${one + two}`)
})

app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))
