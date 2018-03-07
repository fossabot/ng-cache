 import { Injectable } from '@angular/core';

import { CacheItem } from './cache-item';
import { Storage } from './storage';

@Injectable()
export class LocalStorageService implements Storage {
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

        const res: string[] = [];

        Object.keys(localStorage).forEach((key: string) => {
            res.push(key);
        });

        return res;
    }

    setItem(key: string, value: CacheItem): boolean {
        if (!this.enabled) {
            return false;
        }

        try {
            localStorage.setItem(key, JSON.stringify(value));

            return true;
        } catch (e) {
            return false;
        }
    }

    getItem(key: string): CacheItem | undefined {
        if (!this.enabled) {
            return undefined;
        }

        const value = localStorage.getItem(key);

        return value ? JSON.parse(value) : value;
    }

    removeItem(key: string): boolean {
        if (!this.enabled) {
            return false;
        }

        localStorage.removeItem(key);

        return true;
    }

    clear(): boolean {
        if (!this.enabled) {
            return false;
        }

        localStorage.clear();

        return true;
    }
}
