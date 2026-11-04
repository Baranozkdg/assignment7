import { create } from 'zustand'

function loadCart() {
  try {
    const raw = localStorage.getItem('cart')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

const useCartStore = create((set) => ({
  items: loadCart(),

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return {
        items: [
          ...state.items,
          { id: product.id, title: product.title, price: product.price, quantity: 1 }
        ]
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id)
    })),

  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        return { items: state.items.filter((i) => i.id !== id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        )
      }
    }),

  clear: () => set({ items: [] })
}))

// persist to localStorage outside of react
useCartStore.subscribe((state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state.items))
  } catch {
    // ignore
  }
})

export default useCartStore
