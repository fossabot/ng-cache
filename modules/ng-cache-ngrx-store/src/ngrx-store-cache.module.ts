import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CACHE } from '@bizappframework/ng-cache';

import { NgrxStoreCache } from './ngrx-store-cache';

@NgModule({
    providers: [
        {
            provide: CACHE,
            useClass: NgrxStoreCache
        }
    ]
})
export class NgrxStoreCacheModule {
    constructor(@Optional() @SkipSelf() parentModule: NgrxStoreCacheModule) {
        if (parentModule) {
            throw new Error('NgrxStoreCacheModule already loaded. Import in root module only.');
        }
    }
}
