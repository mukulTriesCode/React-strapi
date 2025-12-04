const MEMORY_CACHE_LIMIT = 50;

type MemoryRecord = { data: unknown; updatedAt: number };
const memoryCache = new Map<string, MemoryRecord>();

export function setMemoryCache(key: string, value: unknown) {
  memoryCache.set(key, { data: value, updatedAt: Date.now() });
  if (memoryCache.size > MEMORY_CACHE_LIMIT) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
}

export function getMemoryCache(key: string) {
  return memoryCache.get(key);
}

export function purgeExpiredMemory(ttl?: number) {
  if (!ttl) return;
  const now = Date.now();
  for (const [key, value] of memoryCache.entries()) {
    if (now - value.updatedAt > ttl) memoryCache.delete(key);
  }
}
