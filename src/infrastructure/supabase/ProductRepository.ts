import { supabase } from './client.ts'
import { mapProduct } from './mappers.ts'
import { cache } from '../cache/index.ts'
import type { Product } from '@domain/types/index.ts'
import type { IProductRepository, ProductInput } from '@domain/repositories/index.ts'
import type { ProductRow } from './mappers.ts'

const CACHE_KEY_ALL = 'products:all'
const CACHE_KEY_ACTIVE = 'products:active'

export class ProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const cached = cache.get<Product[]>(CACHE_KEY_ALL)
    if (cached) return cached

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    const products = (data as ProductRow[]).map(mapProduct)
    cache.set(CACHE_KEY_ALL, products)
    return products
  }

  async getActive(): Promise<Product[]> {
    const cached = cache.get<Product[]>(CACHE_KEY_ACTIVE)
    if (cached) return cached

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    const products = (data as ProductRow[]).map(mapProduct)
    cache.set(CACHE_KEY_ACTIVE, products)
    return products
  }

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return mapProduct(data as ProductRow)
  }

  async create(input: ProductInput): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: input.name,
        subtitle: input.subtitle,
        price: input.price ?? null,
        category: input.category,
        image_url: input.imageUrl,
        tag: input.tag ?? null,
        featured: input.featured,
        sort_order: input.sortOrder,
        active: input.active,
      })
      .select()
      .single()

    if (error) throw error
    cache.invalidateByPrefix('products:')
    return mapProduct(data as ProductRow)
  }

  async update(id: string, input: Partial<ProductInput>): Promise<Product> {
    const row: Record<string, unknown> = {}
    if (input.name !== undefined) row.name = input.name
    if (input.subtitle !== undefined) row.subtitle = input.subtitle
    if (input.price !== undefined) row.price = input.price ?? null
    if (input.category !== undefined) row.category = input.category
    if (input.imageUrl !== undefined) row.image_url = input.imageUrl
    if (input.tag !== undefined) row.tag = input.tag ?? null
    if (input.featured !== undefined) row.featured = input.featured
    if (input.sortOrder !== undefined) row.sort_order = input.sortOrder
    if (input.active !== undefined) row.active = input.active

    const { data, error } = await supabase
      .from('products')
      .update(row)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    cache.invalidateByPrefix('products:')
    return mapProduct(data as ProductRow)
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
    cache.invalidateByPrefix('products:')
  }
}
