import { NgModule } from '@angular/core';

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
export class NgrxStoreCacheModule { }
