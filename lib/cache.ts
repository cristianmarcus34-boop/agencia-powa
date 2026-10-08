// lib/cache.ts
interface CacheEntry {
  response: string;
  timestamp: number;
  hitCount: number;
}

export class ResponseCache {
  private static instance: ResponseCache;
  private cache: Map<string, CacheEntry> = new Map();
  private ttl: number = 3600000; // 1 hora
  private maxEntries: number = 1000;

  private constructor() {}

  public static getInstance(): ResponseCache {
    if (!ResponseCache.instance) {
      ResponseCache.instance = new ResponseCache();
    }
    return ResponseCache.instance;
  }

  public get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    entry.hitCount++;
    this.cache.set(key, entry);
    return entry.response;
  }

  public set(key: string, response: string): void {
    if (this.cache.size >= this.maxEntries) {
      this.evictLeastUsed();
    }
    
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
      hitCount: 0,
    });
  }

  public generateKey(message: string, profile: string): string {
    const normalized = message.toLowerCase().trim();
    const clean = normalized.replace(/[.,!?;:()]/g, '').replace(/\s+/g, ' ');
    return `${profile}:${clean}`;
  }

  private evictLeastUsed(): void {
    let minHits = Infinity;
    let keyToRemove: string | null = null;

    for (const [key, entry] of this.cache) {
      if (entry.hitCount < minHits) {
        minHits = entry.hitCount;
        keyToRemove = key;
      }
    }

    if (keyToRemove) {
      this.cache.delete(keyToRemove);
    }
  }

  public clear(): void {
    this.cache.clear();
  }
}