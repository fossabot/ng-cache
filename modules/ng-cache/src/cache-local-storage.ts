import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { CacheItem } from './cache-item';
import { Storage } from './storage';

export const STORAGE_CACHE_KEY_PREFIX = new InjectionToken<string>('STORAGE_CACHE_KEY_PREFIX');
export const DEFAULT_STORAGE_CACHE_KEY_PREFIX = '_cache_.';
export const STORED_VERSION_KEY = '_ngcache_version_';

@Injectable()
export class CacheLocalStorage implements Storage {
    private readonly _cacheKeyPrefix: string;
    private _enabled: boolean | null = null;

    get enabled(): boolean {
        if (this._enabled !== null) {
            return this._enabled;
        }

        if (!localStorage) {
            this._enabled = false;

            return this._enabled;
        }

        try {
            let testKey = '__test__';
            let i = 1;
            while (!!localStorage.getItem(testKey)) {
                testKey = `${testKey}${i}`;
                i = i + 1;
            }
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            this._enabled = true;

            return this._enabled;

        } catch (e) {
            this._enabled = false;

            return this._enabled;
        }
    }

    get name(): string {
        return 'localStorage';
    }

    get keys(): string[] {
        if (!this.enabled) {
            return [];
        }

        return Object.keys(localStorage)
            .filter(key => !this._cacheKeyPrefix || key.startsWith(this._cacheKeyPrefix))
            .map((key: string) => {
                if (this._cacheKeyPrefix && key.length > this._cacheKeyPrefix.length) {
                    return key.substr(this._cacheKeyPrefix.length);
                } else {
                    return key;
                }
            });
    }

    constructor(@Optional() @Inject(STORAGE_CACHE_KEY_PREFIX) cacheKeyPrefix?: string) {
        this._cacheKeyPrefix = cacheKeyPrefix || DEFAULT_STORAGE_CACHE_KEY_PREFIX;
    }

    setItem(key: string, value: CacheItem): boolean {
        if (!this.enabled) {
            return false;
        }

        try {
            localStorage.setItem(`${this._cacheKeyPrefix}${key}`, JSON.stringify(value));

            return true;
        } catch (e) {
            return false;
        }
    }

    getItem(key: string): CacheItem | undefined {
        if (!this.enabled) {
            return undefined;
        }

        const value = localStorage.getItem(`${this._cacheKeyPrefix}${key}`);

        return value ? JSON.parse(value) : value;
    }

    removeItem(key: string): void {
        if (!this.enabled) {
            return;
        }

        localStorage.removeItem(`${this._cacheKeyPrefix}${key}`);
    }

    clear(): void {
        if (!this.enabled) {
            return;
        }

        if (this._cacheKeyPrefix) {
            this.keys.forEach(key => {
                localStorage.removeItem(`${this._cacheKeyPrefix}${key}`);
            });
        } else {
            localStorage.clear();
        }
    }

    _getNgCacheVersion(): string | null {
        if (!this.enabled) {
            return null;
        }

        return localStorage.getItem(STORED_VERSION_KEY);
    }

    _setNgCacheVersion(ver: string): void {
        if (!this.enabled) {
            return;
        }

        localStorage.setItem(STORED_VERSION_KEY, ver);
    }
}
