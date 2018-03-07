import { InjectionToken } from '@angular/core';

import { CacheItem } from './cache-item';
import { Storage } from './storage';

export interface Cache {
    readonly keys: string[];
    readonly storage: Storage | null | undefined;
    init(data?: { [key: string]: CacheItem }): void;
    getItem(key: string): CacheItem | null | undefined;
    setItem(key: string, value: CacheItem): boolean;
    removeItem(key: string): void;
    clear(): void;
}

export const CACHE = new InjectionToken<Cache>('CACHE');
