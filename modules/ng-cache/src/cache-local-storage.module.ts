import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CacheLocalStorage } from './cache-local-storage';
import { STORAGE } from './storage';

@NgModule({
    providers: [
        CacheLocalStorage,
        {
            provide: STORAGE,
            useClass: CacheLocalStorage
        }
    ]
})
export class CacheLocalStorageModule {
    constructor(@Optional() @SkipSelf() parentModule: CacheLocalStorageModule) {
        if (parentModule) {
            throw new Error('CacheLocalStorageModule has already been loaded, import in root module only.');
        }
    }
}
