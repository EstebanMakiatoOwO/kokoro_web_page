export interface Product {
  readonly id: string
  readonly name: string
  readonly subtitle: string
  readonly price?: string
  readonly category: string
  readonly imageUrl: string
  readonly tag?: string
  readonly featured: boolean
  readonly sortOrder: number
  readonly active: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}
