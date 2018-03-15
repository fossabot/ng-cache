import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CACHE_OPTIONS, CacheOptions } from './cache-options';
import { CacheService } from './cache.service';

@NgModule({
    providers: [
        CacheService
    ]
})
export class CacheModule {
    static forRoot(options: CacheOptions): ModuleWithProviders {
        return {
            ngModule: CacheModule,
            providers: [
                {
                    provide: CACHE_OPTIONS,
                    useValue: options
                }
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: CacheModule) {
        if (parentModule) {
            throw new Error('CacheModule has already been loaded, import in root module only.');
        }
    }
}
