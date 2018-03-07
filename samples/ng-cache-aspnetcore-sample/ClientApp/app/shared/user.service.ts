import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { CacheService } from '@bizappframework/ng-cache';
import { Logger, LoggerFactory } from '@bizappframework/ng-logging';
import { Observable } from 'rxjs/Observable';

import { BASE_URL } from './tokens';

@Injectable()
export class UserService {
    private readonly _logger: Logger;

    constructor(
        private readonly _cacheService: CacheService,
        private readonly _httpClient: HttpClient,
        @Inject(BASE_URL) private readonly _baseUrl: string,
        loggerFactory: LoggerFactory) {
        this._logger = loggerFactory.createLogger('app');
    }

    getUsers(): Observable<string[]> {
        return this._cacheService.getOrSet<string[]>('users',
            () => {
                const endpointUrl = `${this._baseUrl}/api/users`;
                this._logger.debug(`Fetching users from ${endpointUrl}`);

                return this._httpClient.get<string[]>(endpointUrl);
            });
    }
}
