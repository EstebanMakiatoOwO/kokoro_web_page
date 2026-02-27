import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@domain/types/index.ts'
import type { ProductInput } from '@domain/repositories/index.ts'
import { ProductRepository } from '@infrastructure/supabase/index.ts'

const repo = new ProductRepository()

export function useProducts(activeOnly = false) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = activeOnly ? await repo.getActive() : await repo.getAll()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando productos')
    } finally {
      setLoading(false)
    }
  }, [activeOnly])

  useEffect(() => { void refresh() }, [refresh])

  const create = useCallback(async (input: ProductInput) => {
    const product = await repo.create(input)
    await refresh()
    return product
  }, [refresh])

  const update = useCallback(async (id: string, input: Partial<ProductInput>) => {
    const product = await repo.update(id, input)
    await refresh()
    return product
  }, [refresh])

  const remove = useCallback(async (id: string) => {
    await repo.delete(id)
    await refresh()
  }, [refresh])

  return { products, loading, error, refresh, create, update, remove }
}
