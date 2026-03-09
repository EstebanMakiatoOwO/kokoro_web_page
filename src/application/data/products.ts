import { PRODUCT_CATALOG } from '../../constants/brand.ts'
import type { Product } from '@domain/types/index.ts'

/** Fallback estático — se usa mientras no haya conexión a Supabase */
export const PRODUCTS: Product[] = PRODUCT_CATALOG.map(p => ({
  id: String(p.id),
  name: p.name,
  subtitle: p.subtitle,
  price: p.price,
  category: p.category,
  imageUrl: `${import.meta.env.BASE_URL}products/${p.image.replace('/products/', '')}`,
  tag: p.tag,
  featured: p.featured ?? false,
  sortOrder: p.id,
  active: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}))
