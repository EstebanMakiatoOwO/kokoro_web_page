interface CacheEntry<T> {
  data: T
  expiresAt: number
}

const DEFAULT_TTL_MS = 5 * 60 * 1000 // 5 minutes

class CacheService {
  private readonly store = new Map<string, CacheEntry<unknown>>()

  get<T>(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.data as T
  }

  set<T>(key: string, data: T, ttlMs = DEFAULT_TTL_MS): void {
    this.store.set(key, { data, expiresAt: Date.now() + ttlMs })
  }

  invalidate(key: string): void {
    this.store.delete(key)
  }

  invalidateByPrefix(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key)
    }
  }

  invalidateAll(): void {
    this.store.clear()
  }
}

export const cache = new CacheService()
