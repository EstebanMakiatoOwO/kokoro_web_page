import { supabase } from './client.ts'
import { mapCarouselSlide } from './mappers.ts'
import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'
import type { ICarouselRepository } from '@domain/repositories/index.ts'
import type { CarouselSlideRow } from './mappers.ts'

export class CarouselRepository implements ICarouselRepository {
  async getAll(): Promise<CarouselSlide[]> {
    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return (data as CarouselSlideRow[]).map(mapCarouselSlide)
  }

  async getActive(): Promise<CarouselSlide[]> {
    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return (data as CarouselSlideRow[]).map(mapCarouselSlide)
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
    return mapCarouselSlide(data as CarouselSlideRow)
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('carousel_slides')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
