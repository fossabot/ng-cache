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
                const endpointUrl = `${this._baseUrl}api/users`;

                return this._httpClient.get(endpointUrl, { observe: 'response' }).pipe(map(
                    (response: HttpResponse<string[]>) => {
                        return handleCacheResponse<string[]>(response, UserCacheKeys.UsersCacheInfo, entryOptions);
                    }));
            });
    }
}
