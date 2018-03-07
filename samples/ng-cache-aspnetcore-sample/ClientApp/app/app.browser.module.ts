import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
    CACHE_CHECK_INFO,
    CacheCheckInfo,
    INITIAL_CACHE_DATA,
    InitialCacheData,
    LocalStorageService,
    STORAGE
} from '@bizappframework/ng-cache';

import { BASE_URL } from 'app/shared/tokens';

import { AppComponent } from './app.component';
import { AppSharedModule } from './app.module';

export const CACHE_KEY = 'APP_CACHE';
export const CACHE_CHECK_INFO_KEY = 'APP_CACHE_CHECK_INFO';

export function getOriginUrl(): string {
    return window.location.origin;
}

export function getRequest(): { cookie: string } {
    // tslint:disable-next-line:no-cookies
    return { cookie: document.cookie };
}

export function getInitialCacheData(): InitialCacheData | null {
    // tslint:disable-next-line:no-any
    const transferData = (<any>window)[CACHE_KEY];
    if (transferData && typeof transferData === 'string') {
        try {
            const cacheData = JSON.parse(transferData);
            if (typeof cacheData === 'object') {
                return <InitialCacheData>cacheData;
            }
        } catch (e) {
            // do nothing
        }
    }

    return null;
}

export function cacheCheckInfoFactory(): CacheCheckInfo | null {
    // tslint:disable-next-line:no-any
    const rawData = (<any>window)[CACHE_CHECK_INFO_KEY];
    if (rawData && typeof rawData === 'string') {
        try {
            const data = JSON.parse(rawData);
            if (typeof data === 'object') {
                return <CacheCheckInfo>data;
            }
        } catch (e) {
            // do nothing
        }
    }

    return null;
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppSharedModule
    ],
    providers: [
        {
            provide: BASE_URL,
            useFactory: (getOriginUrl)
        },
        {
            provide: INITIAL_CACHE_DATA,
            useFactory: (getInitialCacheData)
        },
        {
            provide: CACHE_CHECK_INFO,
            useFactory: (cacheCheckInfoFactory)
        },
        {
            provide: STORAGE,
            useClass: LocalStorageService
        }
    ]
})
export class AppModule { }
