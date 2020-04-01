import React from 'react'
import { server } from '../../lib/api'
import { ListingsData } from './types'

const LISTINGS = `
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}
`
interface Props {
  title: string
}

export const Listings = ({ title }: Props) => {
  const ftechListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
    console.log(data.listings)
  }
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={ftechListings}>Query Listings!</button>
    </div>
  )
}
