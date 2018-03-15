import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CACHE } from '@bizappframework/ng-cache';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CacheEffects } from './cache.effects';
import { cacheReducer } from './cache.reducer';
import { DEFAULT_CACHE_STATE_KEY, NgrxStoreCache } from './ngrx-store-cache';

@NgModule({
    imports: [
        StoreModule.forFeature(DEFAULT_CACHE_STATE_KEY, cacheReducer),
        EffectsModule.forFeature([CacheEffects])
    ],
    providers: [
        NgrxStoreCache,
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
