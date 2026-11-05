import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  )
}
