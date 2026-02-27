import { supabase } from './client.ts'
import { mapSiteSettings } from './mappers.ts'
import { cache } from '../cache/index.ts'
import type { SiteSettings } from '@domain/types/index.ts'
import type { ISettingsRepository } from '@domain/repositories/index.ts'
import type { SiteSettingsRow } from './mappers.ts'

const CACHE_KEY = 'settings'

export class SettingsRepository implements ISettingsRepository {
  async get(): Promise<SiteSettings> {
    const cached = cache.get<SiteSettings>(CACHE_KEY)
    if (cached) return cached

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single()

    if (error) throw error
    const settings = mapSiteSettings(data as SiteSettingsRow)
    cache.set(CACHE_KEY, settings)
    return settings
  }

  async update(settings: Partial<Pick<SiteSettings, 'carouselEnabled'>>): Promise<SiteSettings> {
    const row: Record<string, unknown> = {}
    if (settings.carouselEnabled !== undefined) row.carousel_enabled = settings.carouselEnabled

    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .single()

    const { data, error } = await supabase
      .from('site_settings')
      .update(row)
      .eq('id', existing!.id)
      .select()
      .single()

    if (error) throw error
    cache.invalidate(CACHE_KEY)
    return mapSiteSettings(data as SiteSettingsRow)
  }
}
