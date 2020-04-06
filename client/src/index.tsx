import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, useMutation } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Affix } from 'antd'
import {
  Home,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
  AppHeader,
} from './sections'
import './styles/index.css'
import { LOG_IN } from './lib/graphql/mutations'
import {
  LogIn as LogInData,
  LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn'

import { Viewer } from './lib/types'

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

const client = new ApolloClient({
  uri: '/api',
  request: async (operation) => {
    const token = sessionStorage.getItem('token')
    operation.setContext({
      headers: {
        'X-CSRF-TOKEN': token || '',
      },
    })
  },
})

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn)

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token)
        } else {
          sessionStorage.removeItem('token')
        }
      }
    },
  })

  const logInRef = useRef(logIn)

  useEffect(() => {
    logInRef.current()
  }, [])

  return (
    <Router>
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader viewer={viewer} setViewer={setViewer} />
      </Affix>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/listing/:id" component={Listing} />
        <Route exact path="/listings/:location?" component={Listings} />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} setViewer={setViewer} />}
        />
        <Route
          exact
          path="/user/:id"
          render={(props) => <User {...props} viewer={viewer} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
