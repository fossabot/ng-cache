import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { Cache, CacheItem, STORAGE, Storage } from '@bizappframework/ng-cache';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { CacheState } from './cache-state';
import * as cacheActions from './cache.actions';

export const CACHE_STATE_KEY = new InjectionToken<string>('CACHE_STATE_KEY');

export const DEFAULT_CACHE_STATE_KEY = 'cache';

@Injectable()
export class NgrxStoreCache implements Cache {
    private readonly _cacheStateKey: string;

    constructor(private readonly _store: Store<any>,
        @Optional() @Inject(STORAGE) readonly storage: Storage,
        @Optional() @Inject(CACHE_STATE_KEY) cacheStateKey: string) {
        this._cacheStateKey = cacheStateKey || DEFAULT_CACHE_STATE_KEY;
    }

    get keys(): string[] {
        let keyArray: string[] = [];
        this._store.pipe(
            select(state => state[this._cacheStateKey]),
            map((state: CacheState) => state.data))
            .subscribe((data: { [key: string]: CacheItem }) => {
                if (data) {
                    keyArray = Object.keys(data);
                }

                if (this.storage && this.storage.enabled) {
                    const storeKeys = this.storage.keys;
                    if (storeKeys) {
                        storeKeys
                            .filter(k => !keyArray.includes(k))
                            .forEach(k => keyArray.push(k));
                    }
                }
            });

        return keyArray;
    }

    init(data?: { [key: string]: CacheItem }): void {
        this._store.dispatch(new cacheActions.SetInitialCache(data));
    }

    getItem(key: string): CacheItem | undefined {
        let retValue: CacheItem | undefined;
        this._store.pipe(
            select(state => state[this._cacheStateKey]),
            map((state: CacheState) => state.data))
            .subscribe((data: { [key: string]: CacheItem }) => {
                if (data) {
                    retValue = data[key];
                }
                if (!retValue && this.storage && this.storage.enabled) {
                    retValue = this.storage.getItem(key);
                }
            });

        return retValue;
    }

    setItem(key: string, value: CacheItem): void {
        this._store.dispatch(new cacheActions.SetItem(key, value));
    }

    removeItem(key: string): void {
        this._store.dispatch(new cacheActions.RemoveItem(key));
    }

    clear(): void {
        this._store.dispatch(new cacheActions.Clear());
    }
}
