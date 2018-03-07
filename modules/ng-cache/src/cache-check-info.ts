import { InjectionToken } from '@angular/core';

export interface CacheCheckInfo {
    clearLocalStorage?: boolean;
    appBuildNumber?: string;
    itemInfo: {
        [key: string]: {
            hash?: string;
            absoluteExpiration?: number;
        };
    };
}

export const CACHE_CHECK_INFO = new InjectionToken<CacheCheckInfo>('CACHE_CHECK_INFO');
