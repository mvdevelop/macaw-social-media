// /src/lib/cache.ts
// Cache in-memory simples para evitar re-busca de dados ao navegar entre páginas

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const store = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL = (() => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CACHE_TTL) {
    return parseInt(process.env.NEXT_PUBLIC_CACHE_TTL, 10) * 1000;
  }
  return 30_000; // 30 segundos
})();

// TTL mais curto para comentários (dados mais frescos)
export const COMMENT_CACHE_TTL = 15_000; // 15 segundos

export function getCached<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttl = DEFAULT_TTL): void {
  store.set(key, { data, timestamp: Date.now() + ttl });
}

export function isCacheValid(key: string): boolean {
  const entry = store.get(key);
  if (!entry) return false;
  return Date.now() < entry.timestamp;
}

export function clearCache(key?: string): void {
  if (key) {
    store.delete(key);
  } else {
    store.clear();
  }
}

export function getOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = DEFAULT_TTL
): Promise<T> {
  if (isCacheValid(key)) {
    return Promise.resolve(getCached<T>(key)!);
  }
  return fetcher().then((data) => {
    setCache(key, data, ttl);
    return data;
  });
}
