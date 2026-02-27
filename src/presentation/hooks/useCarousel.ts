import { useState, useEffect, useCallback } from 'react'
import type { CarouselSlide, CarouselSlideInput } from '@domain/types/index.ts'
import { CarouselRepository } from '@infrastructure/supabase/index.ts'

const repo = new CarouselRepository()

export function useCarousel(activeOnly = false) {
  const [slides, setSlides] = useState<CarouselSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = activeOnly ? await repo.getActive() : await repo.getAll()
      setSlides(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando slides')
    } finally {
      setLoading(false)
    }
  }, [activeOnly])

  useEffect(() => { void refresh() }, [refresh])

  const create = useCallback(async (input: CarouselSlideInput) => {
    const slide = await repo.create(input)
    await refresh()
    return slide
  }, [refresh])

  const update = useCallback(async (id: string, input: Partial<CarouselSlideInput>) => {
    const slide = await repo.update(id, input)
    await refresh()
    return slide
  }, [refresh])

  const remove = useCallback(async (id: string) => {
    await repo.delete(id)
    await refresh()
  }, [refresh])

  return { slides, loading, error, refresh, create, update, remove }
}
