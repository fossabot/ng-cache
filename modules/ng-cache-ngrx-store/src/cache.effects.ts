import { Inject, Injectable, Optional } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { CacheItem, Storage, STORAGE } from '@bizappframework/ng-cache';

import {
    CacheActionTypes,
    ClearSuccess,
    RemoveItem,
    RemoveItemSuccess,
    SetInitialCache,
    SetInitialCacheSuccess,
    SetItem,
    SetItemSuccess
} from './cache.actions';

@Injectable()
export class CacheEffects {
    @Effect()
    setInitialCache$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.SetInitialCache),
        map((action: SetInitialCache) => action.payload),
        tap((data: { [key: string]: CacheItem }) => {
            if (data && this._storage && this._storage.enabled) {
                const storage = this._storage;
                Object.keys(data).forEach(key => {
                    const value = data[key];
                    storage.setItem(key, value);
                });
            }
        }),
        map((data: { [key: string]: CacheItem }) => new SetInitialCacheSuccess(data))
    );

    @Effect()
    setItem$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.SetItem),
        tap((action: SetItem) => {
            if (this._storage && this._storage.enabled) {
                this._storage.setItem(action.key, action.value);
            }
        }),
        map((action: SetItem) => new SetItemSuccess(action.key, action.value))
    );

    @Effect()
    removeItem$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.RemoveItem),
        map((action: RemoveItem) => action.key),
        tap((key: string) => {
            if (this._storage && this._storage.enabled) {
                this._storage.removeItem(key);
            }
        }),
        map((key: string) => new RemoveItemSuccess(key))
    );

    @Effect()
    clear$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.Clear),
        tap(() => {
            if (this._storage && this._storage.enabled) {
                this._storage.clear();
            }
        }),
        map(() => new ClearSuccess())
    );

    constructor(
        private _actions$: Actions,
        @Optional() @Inject(STORAGE) private _storage?: Storage) { }
}
