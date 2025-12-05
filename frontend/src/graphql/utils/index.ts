export function getCacheKey(
  query: string,
  variables?: Record<string, unknown>
) {
  if (variables && "slug" in variables) {
    return `page:${variables.slug}`;
  }
  return JSON.stringify(query ?? {});
}

export function isExpired(updatedAt: number, ttl?: number) {
  if (!ttl) return false;
  return Date.now() - updatedAt > ttl;
}
