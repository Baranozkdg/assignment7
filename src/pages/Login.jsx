import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../api/authApi'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { loginUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const user = await login(username, password)
      loginUser(user)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </label>
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
