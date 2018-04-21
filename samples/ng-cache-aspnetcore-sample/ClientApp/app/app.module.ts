import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
    CacheLocalStorageModule,
    CacheModule,
    INITIAL_CACHE_DATA,
    MemoryCacheModule,
    REMOTE_CACHE_CHECKER_ENDPOINT_URL
} from '@bizappframework/ng-cache';

// import {
//     CacheEffects,
//     cacheReducer,
//     NgrxStoreCacheModule
// } from '@bizappframework/ng-cache-ngrx-store';
// import { ConsoleLoggerModule, LoggerModule } from '@bizappframework/ng-logging';

import { BASE_URL } from 'app/shared/tokens';
import { UserService } from 'app/shared/user.service';

import { AppComponent } from './app.component';
// import { metaReducers, reducers } from './reducers';

export const appId = 'ng-cache';

export const CACHE_TRANSFER_KEY = new InjectionToken<string>('CACHE_TRANSFER_KEY');

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,

        // Logging
        // LoggerModule.forRoot({ minLevel: 'trace' }),
        // ConsoleLoggerModule,

        // Caching
        CacheModule.forRoot({
            // clearPreviousCache: !environment.production,
            enableDebug: !true,
            useDefaultRemoteCacheChecker: true,
            remoteCacheCheckInterval: 25000 // for testing short life only, default is 1 hour
        }),
        CacheLocalStorageModule,
        MemoryCacheModule
    ],
    providers: [
        UserService,
        {
            provide: BASE_URL,
            useFactory: (getBaseUrl)
        },
        {
            provide: REMOTE_CACHE_CHECKER_ENDPOINT_URL,
            useFactory: (getRemoteCacheCheckerEndpointUrl),
            deps: [BASE_URL]
        },
        {
            provide: CACHE_TRANSFER_KEY,
            useValue: 'appCache'
        },
        {
            provide: INITIAL_CACHE_DATA,
            useFactory: (getTransferData),
            deps: [CACHE_TRANSFER_KEY]
        }
    ]
})
export class AppModule { }

export function getBaseUrl(): string {
    return document.getElementsByTagName('base')[0].href;
}

export function getRemoteCacheCheckerEndpointUrl(baseUrl: string): string {
    return `${baseUrl}api/cache/check`;
}

export function getTransferData(cacheKey: string): any {
    const win = <any>window;
    if (typeof win !== 'object') {
        return null;
    }

    const rawData = win[cacheKey];
    if (rawData && typeof rawData === 'string') {
        return JSON.parse(rawData);
    } else if (rawData && typeof rawData === 'object') {
        return rawData;
    }

    return null;
}
