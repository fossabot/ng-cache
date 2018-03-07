/* tslint:disable:max-classes-per-file */
import { Action } from '@ngrx/store';

export enum CacheActionTypes {
    Init = '[Cache] Init',
    InitSuccess = '[Cache] Init Success',

    SetItem = '[Cache] Set Item',
    SetItemSuccess = '[Cache] Set Item Success',

    RemoveItem = '[Cache] Remove Item',
    RemoveItemSuccess = '[Cache] Remove Item Success',

    Clear = '[Cache] Clear',
    ClearSuccess = '[Cache] Clear Success'
}

export class Init implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.Init;

    // tslint:disable-next-line:no-any
    constructor(public payload?: { [key: string]: any }) { }
}

export class InitSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.InitSuccess;

    // tslint:disable-next-line:no-any
    constructor(public payload?: { [key: string]: any }) { }
}

export class SetItem implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.SetItem;

    // tslint:disable-next-line:no-any
    constructor(public payload: { key: string; value: any }) { }
}

export class SetItemSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.SetItemSuccess;

    // tslint:disable-next-line:no-any
    constructor(public payload: { key: string; value: any }) { }
}

export class RemoveItem implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.RemoveItem;

    constructor(public payload: string) { }
}

export class RemoveItemSuccess implements Action {
    // tslint:disable-next-line:no-reserved-keywords
    readonly type = CacheActionTypes.RemoveItemSuccess;

    constructor(public payload: string) { }
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
    | Init
    | InitSuccess
    | SetItem
    | SetItemSuccess
    | RemoveItem
    | RemoveItemSuccess
    | Clear
    | ClearSuccess;
