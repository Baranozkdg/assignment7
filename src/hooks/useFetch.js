import { useEffect, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null, data: null }
    case 'SUCCESS':
      return { loading: false, error: null, data: action.payload }
    case 'ERROR':
      return { loading: false, error: action.payload, data: null }
    default:
      return state
  }
}

export default function useFetch(fetchFn, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: null,
    data: null
  })

  useEffect(() => {
    const controller = new AbortController()
    dispatch({ type: 'LOADING' })

    fetchFn(controller.signal)
      .then(data => dispatch({ type: 'SUCCESS', payload: data }))
      .catch(err => {
        if (err.name === 'AbortError') return
        dispatch({ type: 'ERROR', payload: err.message })
      })

    return () => controller.abort()
  }, deps)

  return state
}
