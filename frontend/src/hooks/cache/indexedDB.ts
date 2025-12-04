import { openDB, type DBSchema } from "idb";

interface PageDB extends DBSchema {
  pages: {
    key: string;
    value: { key: string; data: unknown; updatedAt: number };
    indexes: { "by-updatedAt": number };
  };
}

const INDEXEDDB_LIMIT = 100;
export const dbPromise = openDB<PageDB>("PageCacheDB", 1, {
  upgrade(db) {
    const store = db.createObjectStore("pages", { keyPath: "key" });
    store.createIndex("by-updatedAt", "updatedAt");
  },
});

export async function getIndexedDBCache(key: string) {
  const db = await dbPromise;
  return db.get("pages", key);
}

export async function setIndexedDBCache(key: string, data: unknown) {
  const db = await dbPromise;
  await db.put("pages", { key, data, updatedAt: Date.now() });
  await enforceMaxPages();
}

export async function purgeExpiredIndexedDB(ttl?: number) {
  if (!ttl) return;
  const db = await dbPromise;
  const tx = db.transaction("pages", "readwrite");
  const index = tx.store.index("by-updatedAt");
  let cursor = await index.openCursor();
  const now = Date.now();
  while (cursor) {
    if (ttl && now - cursor.value.updatedAt > ttl) await cursor.delete();
    cursor = await cursor.continue();
  }
  await tx.done;
}

async function enforceMaxPages() {
  const db = await dbPromise;
  const count = await db.count("pages");
  if (count <= INDEXEDDB_LIMIT) return;

  const tx = db.transaction("pages", "readwrite");
  const index = tx.store.index("by-updatedAt");
  let cursor = await index.openCursor();
  let removed = 0;
  while (cursor && count - removed > INDEXEDDB_LIMIT) {
    await cursor.delete();
    removed++;
    cursor = await cursor.continue();
  }
  await tx.done;
}
