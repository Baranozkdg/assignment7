import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/login" className="auth-btn">Login</NavLink>
      </div>
    </nav>
  )
}
