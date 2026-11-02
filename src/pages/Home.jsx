import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to the Shop</h1>
      <p>Browse our collection of products and find what you need.</p>
      <Link to="/products" className="btn">Browse Products</Link>
    </div>
  )
}
