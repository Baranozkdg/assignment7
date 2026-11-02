import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { fetchProducts } from '../api/productsApi'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  const { loading, error, data: products } = useFetch(
    (signal) => fetchProducts(signal),
    []
  )

  const categories = useMemo(() => {
    if (!products) return []
    const set = new Set(products.map((p) => p.category))
    return [...set].sort()
  }, [products])

  const filtered = useMemo(() => {
    if (!products) return []
    return products.filter((p) => {
      const matchQuery = p.title.toLowerCase().includes(query.toLowerCase())
      const matchCat = !category || p.category === category
      return matchQuery && matchCat
    })
  }, [products, query, category])

  function updateParam(key, value) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) {
        next.set(key, value)
      } else {
        next.delete(key)
      }
      return next
    })
  }

  if (loading) return <p className="status-msg">Loading products...</p>
  if (error) return <p className="status-msg error">Error: {error}</p>

  return (
    <div className="product-list-page">
      <h2>Products</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => updateParam('q', e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="status-msg">No products match your filters.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
