export interface CacheItem {
    data: Object;
    hash?: string;
    absoluteExpiration?: number | null;
    lastAccessTime?: number | null;
    lastRemoteCheckTime?: number | null;
}
