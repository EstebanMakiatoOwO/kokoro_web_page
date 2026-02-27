import { supabase } from './client.ts'
import { mapCarouselSlide } from './mappers.ts'
import { cache } from '../cache/index.ts'
import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'
import type { ICarouselRepository } from '@domain/repositories/index.ts'
import type { CarouselSlideRow } from './mappers.ts'

const CACHE_KEY_ALL = 'carousel:all'
const CACHE_KEY_ACTIVE = 'carousel:active'

export class CarouselRepository implements ICarouselRepository {
  async getAll(): Promise<CarouselSlide[]> {
    const cached = cache.get<CarouselSlide[]>(CACHE_KEY_ALL)
    if (cached) return cached

    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    const slides = (data as CarouselSlideRow[]).map(mapCarouselSlide)
    cache.set(CACHE_KEY_ALL, slides)
    return slides
  }

  async getActive(): Promise<CarouselSlide[]> {
    const cached = cache.get<CarouselSlide[]>(CACHE_KEY_ACTIVE)
    if (cached) return cached

    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    const slides = (data as CarouselSlideRow[]).map(mapCarouselSlide)
    cache.set(CACHE_KEY_ACTIVE, slides)
    return slides
  }

  async create(input: CarouselSlideInput): Promise<CarouselSlide> {
    const { data, error } = await supabase
      .from('carousel_slides')
      .insert({
        title: input.title,
        subtitle: input.subtitle ?? null,
        cta_label: input.ctaLabel ?? null,
        cta_href: input.ctaHref ?? null,
        image_url: input.imageUrl,
        sort_order: input.sortOrder,
        active: input.active,
      })
      .select()
      .single()

    if (error) throw error
    cache.invalidateByPrefix('carousel:')
    return mapCarouselSlide(data as CarouselSlideRow)
  }

  async update(id: string, input: Partial<CarouselSlideInput>): Promise<CarouselSlide> {
    const row: Record<string, unknown> = {}
    if (input.title !== undefined) row.title = input.title
    if (input.subtitle !== undefined) row.subtitle = input.subtitle ?? null
    if (input.ctaLabel !== undefined) row.cta_label = input.ctaLabel ?? null
    if (input.ctaHref !== undefined) row.cta_href = input.ctaHref ?? null
    if (input.imageUrl !== undefined) row.image_url = input.imageUrl
    if (input.sortOrder !== undefined) row.sort_order = input.sortOrder
    if (input.active !== undefined) row.active = input.active

    const { data, error } = await supabase
      .from('carousel_slides')
      .update(row)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    cache.invalidateByPrefix('carousel:')
    return mapCarouselSlide(data as CarouselSlideRow)
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('carousel_slides')
      .delete()
      .eq('id', id)

    if (error) throw error
    cache.invalidateByPrefix('carousel:')
  }
}
