import { InjectionToken } from '@angular/core';

export interface InitialCacheData {
    // tslint:disable-next-line:no-any
    [key: string]: any;
}

export const INITIAL_CACHE_DATA = new InjectionToken<InitialCacheData>('INITIAL_CACHE_DATA');
