export interface CacheCheckResult {
    expired: boolean;
    hash?: string;
    absoluteExpiration?: number;
}
