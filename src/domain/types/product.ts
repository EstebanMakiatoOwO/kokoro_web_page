import type { Product } from '../../constants/brand.ts'

export type { Product }

export interface CartItem {
  product: Product
  quantity: number
}
