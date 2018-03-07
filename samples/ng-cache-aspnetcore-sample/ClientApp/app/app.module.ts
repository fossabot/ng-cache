import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MemoryCacheModule } from '@bizappframework/ng-cache';
import { NgrxStoreCacheModule } from '@bizappframework/ng-cache-ngrx-store';
import { ConsoleLoggerModule, LoggerModule } from '@bizappframework/ng-logging';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';

import { UserService } from 'app/shared/user.service';

import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';

export const appId = 'ng-cache';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,

        // logging
        LoggerModule.forRoot({ minLevel: 'trace' }),
        ConsoleLoggerModule,

        // ngrx
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
        }),

        // cache
        environment.useNgrxStoreCache ? NgrxStoreCacheModule : MemoryCacheModule
    ],
    providers: [
        UserService
    ]
})
export class AppSharedModule { }
