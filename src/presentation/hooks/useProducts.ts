import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@domain/types/index.ts'
import type { ProductInput } from '@domain/repositories/index.ts'
import { ProductRepository } from '@infrastructure/supabase/index.ts'
import { cache } from '@infrastructure/cache/index.ts'

const repo = new ProductRepository()

interface UseProductsOptions {
  activeOnly?: boolean
  useCache?: boolean
}

export function useProducts(options: UseProductsOptions = {}) {
  const { activeOnly = false, useCache: enableCache = true } = options
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cacheKey = activeOnly ? 'products:active' : 'products:all'

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (enableCache) {
        const cached = cache.get<Product[]>(cacheKey)
        if (cached) {
          setProducts(cached)
          setLoading(false)
          return
        }
      }

      const data = activeOnly ? await repo.getActive() : await repo.getAll()

      if (enableCache) cache.set(cacheKey, data)

      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando productos')
    } finally {
      setLoading(false)
    }
  }, [activeOnly, enableCache, cacheKey])

  useEffect(() => { void refresh() }, [refresh])

  const create = useCallback(async (input: ProductInput) => {
    const product = await repo.create(input)
    cache.invalidateByPrefix('products:')
    await refresh()
    return product
  }, [refresh])

  const update = useCallback(async (id: string, input: Partial<ProductInput>) => {
    const product = await repo.update(id, input)
    cache.invalidateByPrefix('products:')
    await refresh()
    return product
  }, [refresh])

  const remove = useCallback(async (id: string) => {
    await repo.delete(id)
    cache.invalidateByPrefix('products:')
    await refresh()
  }, [refresh])

  return { products, loading, error, refresh, create, update, remove }
}
