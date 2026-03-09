import { useState, useEffect, useCallback } from 'react'
import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'
import { CarouselRepository } from '@infrastructure/supabase/index.ts'
import { cache } from '@infrastructure/cache/index.ts'

const repo = new CarouselRepository()

interface UseCarouselOptions {
  activeOnly?: boolean
  useCache?: boolean
}

export function useCarousel(options: UseCarouselOptions = {}) {
  const { activeOnly = false, useCache: enableCache = true } = options
  const [slides, setSlides] = useState<CarouselSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cacheKey = activeOnly ? 'carousel:active' : 'carousel:all'

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (enableCache) {
        const cached = cache.get<CarouselSlide[]>(cacheKey)
        if (cached) {
          setSlides(cached)
          setLoading(false)
          return
        }
      }

      const data = activeOnly ? await repo.getActive() : await repo.getAll()

      if (enableCache) cache.set(cacheKey, data)

      setSlides(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando slides')
    } finally {
      setLoading(false)
    }
  }, [activeOnly, enableCache, cacheKey])

  useEffect(() => { void refresh() }, [refresh])

  const create = useCallback(async (input: CarouselSlideInput) => {
    const slide = await repo.create(input)
    cache.invalidateByPrefix('carousel:')
    await refresh()
    return slide
  }, [refresh])

  const update = useCallback(async (id: string, input: Partial<CarouselSlideInput>) => {
    const slide = await repo.update(id, input)
    cache.invalidateByPrefix('carousel:')
    await refresh()
    return slide
  }, [refresh])

  const remove = useCallback(async (id: string) => {
    await repo.delete(id)
    cache.invalidateByPrefix('carousel:')
    await refresh()
  }, [refresh])

  return { slides, loading, error, refresh, create, update, remove }
}
