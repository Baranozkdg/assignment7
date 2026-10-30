const BASE = 'https://dummyjson.com'

export async function fetchProducts(signal) {
  const res = await fetch(`${BASE}/products?limit=100`, { signal })
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return data.products
}

export async function fetchProduct(id, signal) {
  const res = await fetch(`${BASE}/products/${id}`, { signal })
  if (!res.ok) {
    if (res.status === 404) throw new Error('Product not found')
    throw new Error('Failed to fetch product')
  }
  return res.json()
}
