import merge from 'lodash.merge'
import { viewerResolver } from './Viewer'
import { userResolver } from './User'
import { listingResolver } from './Listing'
import { bookingResolver } from './Booking'

export const resolvers = merge(
  viewerResolver,
  userResolver,
  listingResolver,
  bookingResolver
)
