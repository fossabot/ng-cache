import { ModuleWithProviders, NgModule } from '@angular/core';

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
}
