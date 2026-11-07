import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useCartStore from '../store/cartStore'

export default function NavBar({ theme, toggleTheme }) {
  const { user, logout } = useAuth()
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">
          Cart {itemCount > 0 && <span className="badge">{itemCount}</span>}
        </NavLink>
      </div>
      <div className="nav-right">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <>
            <span className="user-name">{user.username}</span>
            <button onClick={logout} className="auth-btn">Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="auth-btn">Login</NavLink>
        )}
      </div>
    </nav>
  )
}
