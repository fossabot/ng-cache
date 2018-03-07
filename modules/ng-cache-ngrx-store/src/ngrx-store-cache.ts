import { Inject, Injectable, Optional } from '@angular/core';

import { Cache, CacheItem, STORAGE, Storage } from '@bizappframework/ng-cache';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { CacheState } from './cache-state';
import * as cacheActions from './cache.actions';

export const cacheStateKey = 'cache';

 @Injectable()
export class NgrxStoreCache implements Cache {
    // tslint:disable-next-line:no-any
     constructor(private readonly _store: Store<any>, @Optional() @Inject(STORAGE) readonly storage: Storage) {
        if (!_store) {
            throw new Error("'Store' service is not available.");
        }
    }

    get keys(): string[] {
        let keyArray: string[] = [];
        this._store.pipe(
            select(state => state[cacheStateKey]),
            map((state: CacheState) => state.data))
            .subscribe((data: { [key: string]: CacheItem }) => {
                if (data) {
                    keyArray = Object.keys(data);
                }

                if (this.storage && this.storage.enabled) {
                    const storeKeys = this.storage.keys;
                    if (storeKeys) {
                        storeKeys.filter(k => keyArray.indexOf(k) === -1).forEach(k => keyArray.push(k));
                    }
                }
            });

        return keyArray;
    }

    init(data?: { [key: string]: CacheItem }): void {
        this._store.dispatch(new cacheActions.Init(data));
    }

    getItem(key: string): CacheItem | undefined {
        let retValue: CacheItem | undefined;
        this._store.pipe(
            select(state => state[cacheStateKey]),
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

    setItem(key: string, value: CacheItem): boolean {
        this._store.dispatch(new cacheActions.SetItem({ key: key, value: value }));

        return true;
    }

    removeItem(key: string): void {
        this._store.dispatch(new cacheActions.RemoveItem(key));
    }

    clear(): void {
        this._store.dispatch(new cacheActions.Clear());
    }
}
