import { ObjectId, Collection } from 'mongodb'

export enum ListingType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
}

interface BookingsIndexMonth {
  [key: string]: boolean
}

interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear
}

export interface Listing {
  _id: ObjectId
  title: string
  description: string
  image: string
  host: string // User's _id field
  type: ListingType
  address: string
  country: string
  admin: string // state or province
  city: string
  bookingsIndex: BookingsIndex
  price: number
  bookings: ObjectId[]
  numOfGuests: number
  authorized?: boolean
}

export interface User {
  _id: string // From OAuth, a string
  token: string
  name: string
  avatar: string
  contact: string
  walletId?: string
  income: number
  bookings: ObjectId[]
  listings: ObjectId[]
  authorized?: boolean
}

export interface Booking {
  _id: ObjectId
  listing: ObjectId
  tenant: string // User's _id, which is string
  checkIn: string
  checkOut: string
}

export interface Database {
  bookings: Collection<Booking>
  listings: Collection<Listing>
  users: Collection<User>
}

export interface Viewer {
  _id?: string
  token?: string
  avatar?: string
  walletId?: string
  didRequest: boolean
}
