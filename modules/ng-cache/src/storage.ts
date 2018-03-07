import { InjectionToken } from '@angular/core';

import { CacheItem } from './cache-item';

export interface Storage {
    readonly name: string;
    readonly enabled: boolean;
    readonly keys: string[];
    setItem(key: string, value: CacheItem): boolean;
    getItem(key: string): CacheItem | undefined;
    removeItem(key: string): boolean;
    clear(): boolean;
}

export const STORAGE = new InjectionToken<Storage>('STORAGE');
