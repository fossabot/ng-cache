ng-cache
=====================

[![npm version](https://badge.fury.io/js/%40bizappframework%2Fng-cache.svg)](https://badge.fury.io/js/%40bizappframework%2Fng-cache)

Contains cache services for Angular app.

Installation
---------------

```bash
npm install @bizappframework/ng-cache
```


Setup
---------------

```typescript
import { CacheLocalStorageModule, CacheModule, MemoryCacheModule } from '@bizappframework/ng-cache';

@NgModule({    
    imports: [
        // Other module imports

        // Caching
        CacheModule,
        CacheLocalStorageModule,
        MemoryCacheModule
    ]    
})
export class AppModule { }
```

Usage
---------------

```typescript
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { CacheEntryOptions, CacheService, handleCacheResponse } from '@bizappframework/ng-cache';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { BASE_URL } from './tokens';

export enum UserCacheKeys {
    Users = 'users',
    UsersCacheInfo = 'users.cacheinfo',
}

@Injectable()
export class UserService {

    constructor(
        private readonly _cacheService: CacheService,
        private readonly _httpClient: HttpClient,
        @Inject(BASE_URL) private readonly _baseUrl: string) {
    }

    getUsers(): Observable<string[]> {
        return this._cacheService.getOrSet(UserCacheKeys.Users,
            (entryOptions: CacheEntryOptions) => {
                const endpointUrl = `${this._baseUrl}/api/users`;

                return this._httpClient.get(endpointUrl, { observe: 'response' }).pipe(map(
                    (response: HttpResponse<string[]>) => {
                        return handleCacheResponse<string[]>(response, UserCacheKeys.UsersCacheInfo, entryOptions);
                    }));
            });
    }
}

```

Example
---------------

[ng-cache-aspnetcore-sample](https://github.com/BizAppFramework/ng-cache/tree/master/samples/ng-cache-aspnetcore-sample)

License
---------------

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)