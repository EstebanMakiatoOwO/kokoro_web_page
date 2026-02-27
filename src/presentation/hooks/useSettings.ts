import { useState, useEffect, useCallback } from 'react'
import type { SiteSettings } from '@domain/types/index.ts'
import { SettingsRepository } from '@infrastructure/supabase/index.ts'
import { cache } from '@infrastructure/cache/index.ts'

const repo = new SettingsRepository()

const CACHE_KEY = 'settings'

interface UseSettingsOptions {
  useCache?: boolean
}

export function useSettings(options: UseSettingsOptions = {}) {
  const { useCache: enableCache = true } = options
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (enableCache) {
        const cached = cache.get<SiteSettings>(CACHE_KEY)
        if (cached) {
          setSettings(cached)
          setLoading(false)
          return
        }
      }

      const data = await repo.get()

      if (enableCache) cache.set(CACHE_KEY, data)

      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando configuración')
    } finally {
      setLoading(false)
    }
  }, [enableCache])

  useEffect(() => { void refresh() }, [refresh])

  const updateSettings = useCallback(async (
    partial: Partial<Pick<SiteSettings, 'carouselEnabled'>>
  ) => {
    const updated = await repo.update(partial)
    cache.invalidate(CACHE_KEY)
    setSettings(updated)
    return updated
  }, [])

  return { settings, loading, error, refresh, updateSettings }
}
