import type { SiteSettings } from '@domain/types/index.ts'

export interface ISettingsRepository {
  get(): Promise<SiteSettings>
  update(settings: Partial<Pick<SiteSettings, 'carouselEnabled'>>): Promise<SiteSettings>
}
