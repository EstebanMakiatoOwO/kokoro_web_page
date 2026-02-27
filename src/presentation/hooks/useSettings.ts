import { useState, useEffect, useCallback } from 'react'
import type { SiteSettings } from '@domain/types/index.ts'
import { SettingsRepository } from '@infrastructure/supabase/index.ts'

const repo = new SettingsRepository()

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await repo.get()
      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando configuración')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  const updateSettings = useCallback(async (
    partial: Partial<Pick<SiteSettings, 'carouselEnabled'>>
  ) => {
    const updated = await repo.update(partial)
    setSettings(updated)
    return updated
  }, [])

  return { settings, loading, error, refresh, updateSettings }
}
