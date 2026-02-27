import type { Product } from '@domain/types/index.ts'
import type { CarouselSlide } from '@domain/types/index.ts'
import type { SiteSettings } from '@domain/types/index.ts'

export interface ProductRow {
  id: string
  name: string
  subtitle: string
  price: string | null
  category: string
  image_url: string
  tag: string | null
  featured: boolean
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface CarouselSlideRow {
  id: string
  title: string
  subtitle: string | null
  cta_label: string | null
  cta_href: string | null
  image_url: string
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface SiteSettingsRow {
  id: string
  carousel_enabled: boolean
  updated_at: string
}

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    price: row.price ?? undefined,
    category: row.category,
    imageUrl: row.image_url,
    tag: row.tag ?? undefined,
    featured: row.featured,
    sortOrder: row.sort_order,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapCarouselSlide(row: CarouselSlideRow): CarouselSlide {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    ctaLabel: row.cta_label ?? undefined,
    ctaHref: row.cta_href ?? undefined,
    imageUrl: row.image_url,
    sortOrder: row.sort_order,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapSiteSettings(row: SiteSettingsRow): SiteSettings {
  return {
    id: row.id,
    carouselEnabled: row.carousel_enabled,
    updatedAt: row.updated_at,
  }
}
