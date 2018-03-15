/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';

import { CacheItem } from '@bizappframework/ng-cache';

export enum CacheActionTypes {
    SetInitialCache = '[Cache] Set Initial Cache',
    SetInitialCacheSuccess = '[Cache] Set Initial Cache Success',

    SetItem = '[Cache] Set Item',
    SetItemSuccess = '[Cache] Set Item Success',

    RemoveItem = '[Cache] Remove Item',
    RemoveItemSuccess = '[Cache] Remove Item Success',

    Clear = '[Cache] Clear',
    ClearSuccess = '[Cache] Clear Success'
}

export class SetInitialCache implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.SetInitialCache;

    constructor(public payload?: { [key: string]: CacheItem }) { }
}

export class SetInitialCacheSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.SetInitialCacheSuccess;

    constructor(public payload?: { [key: string]: CacheItem }) { }
}

export class SetItem implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.SetItem;

    constructor(public key: string, public value: CacheItem) { }
}

export class SetItemSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.SetItemSuccess;

    constructor(public key: string, public value: CacheItem) {}
}

export class RemoveItem implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.RemoveItem;

    constructor(public key: string) { }
}

export class RemoveItemSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.RemoveItemSuccess;

    constructor(public key: string) { }
}

export class Clear implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.Clear;
}

export class ClearSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.ClearSuccess;
}

export type CacheActions =
    | SetInitialCache
    | SetInitialCacheSuccess
    | SetItem
    | SetItemSuccess
    | RemoveItem
    | RemoveItemSuccess
    | Clear
    | ClearSuccess;
