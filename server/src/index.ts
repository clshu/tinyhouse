import express, { Application } from 'express'
// import bodyParser from 'body-parser'
import { connectDatabase } from './database'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'

// import { listings } from './listings'

// const app = express()
const PORT = process.env.NODE_ENV || 9000

const mount = async (app: Application) => {
  const db = await connectDatabase()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  })
  server.applyMiddleware({ app, path: '/api' })

  app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))

  //   const listings = await db.listings.find({}).toArray()
  //   console.log(listings)
}

mount(express())
