import { useState, useEffect, useRef, useCallback } from "react";
import { getCacheKey } from "../utils";
import {
  setMemoryCache,
  getMemoryCache,
  purgeExpiredMemory,
} from "../cache/memory";
import {
  getIndexedDBCache,
  setIndexedDBCache,
  purgeExpiredIndexedDB,
} from "../cache/indexedDB";
import { useGraphQLClient } from "../client/GraphQLContext";

type UseQueryOptions = {
  variables?: Record<string, unknown>;
  cache?: boolean;
  cacheTTL?: number;
  revalidateOnMount?: boolean;
  pollInterval?: number;
  cleanupInterval?: number;
};

type UseQueryResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
};

export function useQuery<T = unknown>(
  query: string,
  options?: UseQueryOptions
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const client = useGraphQLClient();
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cleanupRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cacheKey = getCacheKey(query, options?.variables);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (options?.cache) {
        const memory = getMemoryCache(cacheKey);
        if (memory) setData(memory.data as T);
      }

      const result = await client.request<T, Record<string, unknown> | undefined>(
        query,
        options?.variables
      );

      if (result) {
        setData(result);
        if (options?.cache) {
          setMemoryCache(cacheKey, result);
          await setIndexedDBCache(cacheKey, result);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [client, query, cacheKey, options?.variables, options?.cache]);

  useEffect(() => {
    let cancelled = false;
    const loadCache = async () => {
      if (!options?.cache) return false;

      purgeExpiredMemory(options.cacheTTL);
      await purgeExpiredIndexedDB(options.cacheTTL);

      const memory = getMemoryCache(cacheKey);
      if (memory) {
        setData(memory.data as T);
        setLoading(false);
        return true;
      }

      const dbData = await getIndexedDBCache(cacheKey);
      if (dbData) {
        setMemoryCache(cacheKey, dbData.data);
        if (!cancelled) setData(dbData.data as T);
        setLoading(false);
        return true;
      }

      return false;
    };

    loadCache().then((found) => {
      if (!found || options?.revalidateOnMount) fetchData();
    });

    return () => {
      cancelled = true;
    };
  }, [
    fetchData,
    cacheKey,
    options?.cache,
    options?.revalidateOnMount,
    options?.cacheTTL,
  ]);

  useEffect(() => {
    if (options?.pollInterval && options.pollInterval > 0) {
      pollRef.current = setInterval(fetchData, options.pollInterval);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }
  }, [fetchData, options?.pollInterval]);

  useEffect(() => {
    if (options?.cache && options?.cleanupInterval) {
      cleanupRef.current = setInterval(async () => {
        purgeExpiredMemory(options.cacheTTL);
        await purgeExpiredIndexedDB(options.cacheTTL);
      }, options.cleanupInterval);

      return () => {
        if (cleanupRef.current) clearInterval(cleanupRef.current);
      };
    }
  }, [options?.cache, options?.cacheTTL, options?.cleanupInterval]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, error, loading, refetch };
}
