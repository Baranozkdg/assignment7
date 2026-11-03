import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext(null)

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return { user: action.payload }
    case 'LOGGED_OUT':
      return { user: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  const loginUser = (user) => dispatch({ type: 'LOGGED_IN', payload: user })
  const logout = () => dispatch({ type: 'LOGGED_OUT' })

  return (
    <AuthContext.Provider value={{ user: state.user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
