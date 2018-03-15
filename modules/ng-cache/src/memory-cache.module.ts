import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CACHE } from './cache';
import { MemoryCache } from './memory-cache';

@NgModule({
    providers: [
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
            throw new Error('MemoryCacheModule has already been loaded, import in root module only.');
        }
    }
}
