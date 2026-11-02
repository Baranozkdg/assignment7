import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
    </div>
  )
}
