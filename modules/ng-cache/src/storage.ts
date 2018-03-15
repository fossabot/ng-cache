import { InjectionToken } from '@angular/core';

import { CacheItem } from './cache-item';

export interface Storage {
    readonly name: string;
    readonly enabled: boolean;
    readonly keys: string[];
    setItem(key: string, value: CacheItem): boolean;
    getItem(key: string): CacheItem | undefined;
    removeItem(key: string): void;
    clear(): void;
    _getNgCacheVersion(): string | null;
    _setNgCacheVersion(ver: string): void;
}

export const STORAGE = new InjectionToken<Storage>('STORAGE');
