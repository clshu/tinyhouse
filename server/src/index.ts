import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './graphql'
// import { listings } from './listings'

const app = express()
const PORT = process.env.NODE_ENV || 9000

const server = new ApolloServer({ schema })
server.applyMiddleware({ app, path: '/api' })

app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))
