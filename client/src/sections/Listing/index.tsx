import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Layout, Col, Row } from 'antd'
import { PageSkeleton, ErrorBanner } from '../../lib/components'
import { LISTING } from '../../lib/graphql/queries'
import { ListingDetails, ListingBookings } from './components'
import {
  Listing as ListingData,
  ListingVariables,
} from '../../lib/graphql/queries/Listing/__generated__/Listing'

interface MatchParams {
  id: string
}

const { Content } = Layout
const PAGE_LIMIT = 3

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1)

  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: match.params.id,
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    }
  )

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className="listing">
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    )
  }

  const listing = data ? data.listing : null
  //const listingBookings = listing ? listing.bookings : null
  const listingBookings = {
    total: 4,
    result: [
      {
        id: '5daa530eefc64b001767247c',
        tenant: {
          id: '117422637055829818290',
          name: 'User X',
          avatar:
            'https://lh3.googleusercontent.com/a-/AAuE7mBL9NpzsFA6mGSC8xIIJfeK4oTeOJpYvL-gAyaB=s100',
          __typename: 'User',
        },
        checkIn: '2019-10-29',
        checkOut: '2019-10-31',
        __typename: 'Booking',
      },
      {
        id: '5daa530eefc64b001767247d',
        tenant: {
          id: '117422637055829818290',
          name: 'User X',
          avatar:
            'https://lh3.googleusercontent.com/a-/AAuE7mBL9NpzsFA6mGSC8xIIJfeK4oTeOJpYvL-gAyaB=s100',
          __typename: 'User',
        },
        checkIn: '2019-11-01',
        checkOut: '2019-11-03',
        __typename: 'Booking',
      },
      {
        id: '5daa530eefc64b001767247g',
        tenant: {
          id: '117422637055829818290',
          name: 'User X',
          avatar:
            'https://lh3.googleusercontent.com/a-/AAuE7mBL9NpzsFA6mGSC8xIIJfeK4oTeOJpYvL-gAyaB=s100',
          __typename: 'User',
        },
        checkIn: '2019-11-05',
        checkOut: '2019-11-09',
        __typename: 'Booking',
      },
      {
        id: '5daa530eefc64b001767247f',
        tenant: {
          id: '117422637055829818290',
          name: 'User X',
          avatar:
            'https://lh3.googleusercontent.com/a-/AAuE7mBL9NpzsFA6mGSC8xIIJfeK4oTeOJpYvL-gAyaB=s100',
          __typename: 'User',
        },
        checkIn: '2019-11-10',
        checkOut: '2019-11-11',
        __typename: 'Booking',
      },
    ],
  } as any

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={listingBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null

  return (
    <Content className="listings">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
      </Row>
    </Content>
  )
}
