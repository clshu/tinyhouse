import { useState, useEffect, useCallback } from 'react'
import { server } from './server'
import { State } from './types'

interface QueryResult<TData> extends State<TData> {
  refetch: () => void
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false
  })

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        setState({ data: null, loading: true, error: false })
        const { data, errors } = await server.fetch<TData>({ query })

        if (errors && errors.length) {
          throw new Error(errors[0].message)
        }

        setState({ data, loading: false, error: false })
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: true
        })

        throw console.error(err)
      }
    }

    fetchApi()
  }, [query])

  useEffect(() => {
    fetch()
    // console.log('Effect has run!')
  }, [fetch])

  return { ...state, refetch: fetch }
}
