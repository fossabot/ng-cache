import { InjectionToken } from '@angular/core';

export interface InitialCacheData {
    [key: string]: Object;
}

export const INITIAL_CACHE_DATA = new InjectionToken<InitialCacheData>('INITIAL_CACHE_DATA');
