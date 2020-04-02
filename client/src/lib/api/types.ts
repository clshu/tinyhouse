export interface State<TData> {
  data: TData | null
  loading: boolean
  error: boolean
}

export type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' }
