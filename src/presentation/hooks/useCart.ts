import { useState, useCallback, useMemo } from 'react'
import type { CartItem, Product } from '@domain/types/index.ts'

export interface CartActions {
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

export interface UseCartReturn {
  items: CartItem[]
  total: number
  itemCount: number
  actions: CartActions
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId))
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const numericPrice = parseFloat((item.product.price ?? '0').replace(/[^0-9.]/g, ''))
      return sum + numericPrice * item.quantity
    }, 0)
  }, [items])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  return {
    items,
    total,
    itemCount,
    actions: { addToCart, removeFromCart, updateQuantity },
  }
}
