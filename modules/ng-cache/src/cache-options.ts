import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CacheCheckResult } from './cache-check-result';

export interface CacheOptions {
    absoluteExpirationRelativeToNow?: number;
    clearPreviousCache?: boolean;
    enableDebug?: boolean;
    remoteCacheCheckInterval?: number;
    remoteCacheCheckerEndpointUrl?: string | (() => string);
    useDefaultRemoteCacheChecker?: boolean;
    remoteCacheChecker?(key: string, hash: string): Observable<CacheCheckResult>;
}

export const CACHE_OPTIONS = new InjectionToken<CacheOptions>('CACHE_OPTIONS');
