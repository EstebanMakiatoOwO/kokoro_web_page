import type { Product } from '@domain/types/index.ts'

export interface ProductInput {
  name: string
  subtitle: string
  price?: string
  category: string
  imageUrl: string
  tag?: string
  featured: boolean
  sortOrder: number
  active: boolean
}

export interface IProductRepository {
  getAll(): Promise<Product[]>
  getActive(): Promise<Product[]>
  getById(id: string): Promise<Product | null>
  create(input: ProductInput): Promise<Product>
  update(id: string, input: Partial<ProductInput>): Promise<Product>
  delete(id: string): Promise<void>
}
