import { Inject, Injectable, Optional } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { Storage, STORAGE } from '@bizappframework/ng-cache';

import {
    CacheActionTypes,
    ClearSuccess,
    Init,
    InitSuccess,
    RemoveItem,
    RemoveItemSuccess,
    SetItem,
    SetItemSuccess
} from './cache.actions';

@Injectable()
export class CacheEffects {
    @Effect()
    init$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.Init),
        map((action: Init) => action.payload),
        tap(data => {
            if (data && this._storage && this._storage.enabled) {
                const storage = <Storage>this._storage;
                Object.keys(data).forEach(key => {
                    const value = data[key];
                    storage.setItem(key, value);
                });
            }
        }),
        map(data => new InitSuccess(data))
    );

    @Effect()
    setItem$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.SetItem),
        map((action: SetItem) => action.payload),
        tap(data => {
            if (this._storage && this._storage.enabled) {
                this._storage.setItem(data.key, data.value);
            }
        }),
        map(data => new SetItemSuccess(data))
    );

    @Effect()
    removeItem$: Observable<Action> = this._actions$.pipe(
        ofType(CacheActionTypes.RemoveItem),
        map((action: RemoveItem) => action.payload),
        tap(key => {
            if (this._storage && this._storage.enabled) {
                this._storage.removeItem(key);
            }
        }),
        map(key => new RemoveItemSuccess(key))
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
