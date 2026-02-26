import type { Product } from '../../constants/brand.ts'

export type { Product }

// No se usa de momento, pero se mantiene para cuando se active e-commerce
export interface CartItem {
  product: Product
  quantity: number
}
