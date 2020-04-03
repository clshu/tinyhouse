import { IResolvers } from 'apollo-server-express'

export const viewerResolver: IResolvers = {
  Query: {
    authUrl: () => {
      return 'Query.authUrl'
    }
  },
  Mutation: {
    logIn: () => {
      return 'Mutation.logIn'
    },
    logOut: () => {
      return 'Mutation.logOut'
    }
  }
}
