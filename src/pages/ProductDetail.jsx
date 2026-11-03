import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { fetchProduct } from '../api/productsApi'
import useCartStore from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  const { loading, error, data: product } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  )

  if (loading) return <p className="status-msg">Loading...</p>
  if (error) return <p className="status-msg error">{error}</p>

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate('/products')}>
        ← Back to Products
      </button>
      <div className="detail-content">
        <img src={product.thumbnail} alt={product.title} />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <span className="detail-category">{product.category}</span>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <button className="btn" onClick={() => addItem(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
