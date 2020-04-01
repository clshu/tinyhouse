import { MongoClient } from 'mongodb'
import { Database } from '../lib/types'

const user = 'graphql'
const password = 'test1234'
const cluster = 'cluster0-9ha6x'
const uri = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = client.db('main')

  return {
    listings: db.collection('test_listings')
  }
}
