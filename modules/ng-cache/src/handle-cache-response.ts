import { HttpResponse } from '@angular/common/http';

import { CacheEntryOptions } from './cache-entry-options';

export function handleCacheResponse<T>(response: HttpResponse<T>,
    cacheInfoKey: string,
    entryOptions: CacheEntryOptions): T;

export function handleCacheResponse(response: HttpResponse<any>,
    cacheInfoKey: string,
    entryOptions: CacheEntryOptions): any {
    if (response.headers.has(cacheInfoKey)) {
        const headerValue = response.headers.get(cacheInfoKey);
        if (headerValue) {
            const cacheInfo = <CacheEntryOptions>JSON.parse(headerValue);
            if (cacheInfo) {
                if (cacheInfo.hash) {
                    entryOptions.hash = cacheInfo.hash;
                }
                if (cacheInfo.absoluteExpiration && typeof cacheInfo.absoluteExpiration === 'number') {
                    entryOptions.absoluteExpiration = cacheInfo.absoluteExpiration;
                }
            }
        }
    }

    return response.body;
}
