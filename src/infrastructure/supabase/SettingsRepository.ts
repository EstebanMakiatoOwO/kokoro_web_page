import { supabase } from './client.ts'
import { mapSiteSettings } from './mappers.ts'
import type { SiteSettings } from '@domain/types/index.ts'
import type { ISettingsRepository } from '@domain/repositories/index.ts'
import type { SiteSettingsRow } from './mappers.ts'

export class SettingsRepository implements ISettingsRepository {
  async get(): Promise<SiteSettings> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single()

    if (error) throw error
    return mapSiteSettings(data as SiteSettingsRow)
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
    return mapSiteSettings(data as SiteSettingsRow)
  }
}
