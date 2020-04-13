import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Affix, Layout, List, Typography } from 'antd'
import { ListingCard } from '../../lib/components'
import { ListingsFilters, ListingsPagination } from './components'
import { LISTINGS } from '../../lib/graphql/queries'
import {
  Listings as ListingsData,
  ListingsVariables
} from '../../lib/graphql/queries/Listings/__generated__/Listings'
import { ListingsFilter } from '../../lib/graphql/globalTypes'

interface MatchParams {
  location: string
}

const { Content } = Layout
const { Paragraph, Text, Title } = Typography

const PAGE_LIMIT = 4

export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
  const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH)
  const [page, setPage] = useState(1)

  const { data } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
    variables: {
      location: match.params.location,
      filter,
      limit: PAGE_LIMIT,
      page
    }
  })

  const listings = data ? data.listings : null
  const listingsRegion = listings ? listings.region : null

  /* tslint:disable */
  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <ListingsFilters filter={filter} setFilter={setFilter} />

        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4
          }}
          dataSource={listings.result}
          renderItem={listing => (
            <List.Item>
              <ListingCard listing={listing} />
            </List.Item>
          )}
        />
      </div>
    ) : (
      <div>
        <Paragraph>
          It appears that no listings have yet been created for{' '}
          <Text mark>"{listingsRegion}"</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a{' '}
          <Link to="/host">listing in this area</Link>!
        </Paragraph>
      </div>
    )

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null

  return (
    <Content className="listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  )
}
