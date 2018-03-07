import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CACHE } from './cache';
import { CacheService } from './cache.service';
import { MemoryCache } from './memory-cache';

@NgModule({
    providers: [
        CacheService,
        MemoryCache,
        {
            provide: CACHE,
            useClass: MemoryCache
        }
    ]
})
export class MemoryCacheModule {
    constructor(@Optional() @SkipSelf() parentModule: MemoryCacheModule) {
        if (parentModule) {
            throw new Error('MemoryCacheModule already loaded, import in root module only.');
        }
    }
}
