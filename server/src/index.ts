require('dotenv').config()
import express, { Application } from 'express'
// import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { connectDatabase } from './database'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'

// import { listings } from './listings'

// const app = express()

// const PORT = process.env.PORT || 9000

const { PORT, SECRET } = process.env

const mount = async (app: Application) => {
  const db = await connectDatabase()

  app.use(cookieParser(SECRET))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  })
  server.applyMiddleware({ app, path: '/api' })

  app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))

  // const listings = await db.listings.find({}).toArray()
  // console.log(listings)
}

mount(express())
