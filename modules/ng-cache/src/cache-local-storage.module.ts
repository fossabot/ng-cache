import { NgModule } from '@angular/core';

import { CacheLocalStorage } from './cache-local-storage';
import { STORAGE } from './storage';

@NgModule({
    providers: [
        {
            provide: STORAGE,
            useClass: CacheLocalStorage
        }
    ]
})
export class CacheLocalStorageModule { }
