import merge from 'lodash.merge'
import { viewerResolver } from './Viewer'
import { userResolver } from './User'
import { listingResolvers } from './Listing'
import { bookingResolvers } from './Booking'

export const resolvers = merge(
  viewerResolver,
  userResolver,
  listingResolvers,
  bookingResolvers
)
