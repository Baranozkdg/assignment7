import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

export default function Cart() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const clear = useCartStore((s) => s.clear)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p className="status-msg">Your cart is empty.</p>
        <Link to="/products" className="btn">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h4>{item.title}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <button onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p className="cart-total">Total: ${total.toFixed(2)}</p>
        <button className="btn btn-danger" onClick={clear}>Clear Cart</button>
      </div>
    </div>
  )
}
