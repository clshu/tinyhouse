const express = require('express')
const app = express()
const PORT = process.env.NODE_ENV || 9000

const one = 1
const two = 'two'

app.get('/', (req, res) => {
  res.send(`1 + 2 = ${one + two}`)
})

app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))
