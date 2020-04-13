import { google } from 'googleapis'
import { Client } from '@googlemaps/google-maps-services-js'

const { G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL } = process.env

const auth = new google.auth.OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  `${PUBLIC_URL}/login`
)

const maps = new Client({})

const parseAddress = (addressComponents: any[]) => {
  let country = null
  let admin = null
  let city = null

  for (const component of addressComponents) {
    if (component.types.includes('country')) {
      country = component.long_name
    }

    if (component.types.includes('administrative_area_level_1')) {
      admin = component.long_name
    }
    if (
      component.types.includes('locality') ||
      component.types.includes('postal_town')
    ) {
      city = component.long_name
    }
  }

  return { country, admin, city }
}

export const Google = {
  authUrl: auth.generateAuthUrl({
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }),
  logIn: async (code: string) => {
    // make a request to Google using a "code" to get our user's access token
    const { tokens } = await auth.getToken(code)

    auth.setCredentials(tokens)

    const { data } = await google.people({ version: 'v1', auth }).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos'
    })

    return { user: data }
  },
  geocode: async (address: string) => {
    const res = await maps.geocode({
      params: {
        key: `${process.env.G_GEOCODE_KEY}`,
        address
      }
    })

    if (res.status < 200 || res.status > 299) {
      throw new Error('failed to geocode address')
    }

    return parseAddress(res.data.results[0].address_components)
  }
}
