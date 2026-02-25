import type { Product } from '../../constants/brand'

export type { Product }

export interface CartItem {
  product: Product
  quantity: number
}
