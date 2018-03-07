import { Inject, Injectable, Optional } from '@angular/core';

import { Logger, LoggerFactory } from '@bizappframework/ng-logging';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import { Cache, CACHE } from './cache';
import { CACHE_CHECK_INFO, CacheCheckInfo } from './cache-check-info';
import { CacheItem } from './cache-item';
import { CacheOptions } from './cache-options';
import { INITIAL_CACHE_DATA, InitialCacheData } from './initial-cache-data';

@Injectable()
export class CacheService {
    private readonly _logger: Logger;

    constructor(@Inject(CACHE) private readonly _cache: Cache,
        loggerFactory: LoggerFactory,
        @Optional() @Inject(CACHE_CHECK_INFO) private readonly _cacheCheckInfo?: CacheCheckInfo,
        @Optional() @Inject(INITIAL_CACHE_DATA) data?: InitialCacheData) {
        this._logger = loggerFactory.createLogger('bizappframework.ng-cache.cache-service');

        // validate cache
        if (this._cacheCheckInfo && this._cache.storage && this._cache.storage.enabled) {
            this._logger.debug('Checking cache validity');

            const cacheValidationInfoLocal = this._cacheCheckInfo;
            const storageLocal = this._cache.storage;
            const storedKeys = storageLocal.keys;

            if (cacheValidationInfoLocal.clearLocalStorage) {
                this._logger.debug('Clearing local storage cache');
                storageLocal.clear();
            } else if (cacheValidationInfoLocal.itemInfo) {
                Object.keys(cacheValidationInfoLocal.itemInfo)
                    .filter(key => storedKeys.includes(key))
                    .forEach(key => {
                        const storedItem = storageLocal.getItem(key);
                        if (storedItem && this.isValid(key, storedItem)) {
                            this._logger.debug(`Removing cache from storage, key: ${key}`);
                            storageLocal.removeItem(key);
                        }
                    });
            }
        }

        // init cache
        const initialData: { [key: string]: CacheItem } = {};
        if (data) {
            Object.keys(data)
                .forEach((key: string) => {
                    const value = data[key];
                    initialData[key] = {
                        data: value,
                        appBuildNumber: this.getAppBuildNumberFromInfo(),
                        hash: this.getHashFromInfo(key),
                        absoluteExpiration: this.getExpirationFromInfo(key)
                    };
                });
        }

        this._cache.init(initialData);
    }

    // tslint:disable-next-line:no-any
    setItem(key: string, value: { [key: string]: any }, cacheOptions?: CacheOptions): boolean {
        const hash = this.getHashFromInfo(key);
        const options: CacheOptions = { hash: hash, ...cacheOptions };
        if (options.absoluteExpiration != null && options.absoluteExpiration <= 0) {
            throw new Error('The absolute expiration value must be positive.');
        }

        this._logger.debug(`Setting cache, key: ${key}`);

        return this._cache.setItem(key,
            {
                data: value,
                absoluteExpiration: options.absoluteExpiration,
                hash: options.hash
            });
    }

    getItem<T>(key: string): T;

    // tslint:disable-next-line:no-any
    getItem(key: string): any {
        const cachedItem = this._cache.getItem(key);

        if (cachedItem) {
            if (this.isValid(key, cachedItem)) {
                this._logger.debug(`Retrieved from cache, key: ${key}`);

                return cachedItem.data;
            } else {
                this.removeItem(key);
            }
        }

        return null;
    }

    getOrSet<T>(key: string, factory: () => Observable<T>, options?: CacheOptions): Observable<T>;

    // tslint:disable-next-line:no-any
    getOrSet(key: string, factory: () => Observable<any>, options?: CacheOptions): Observable<any> {
        const cachedItem = this._cache.getItem(key);
        if (cachedItem) {
            if (this.isValid(key, cachedItem)) {
                this._logger.debug(`Retrieved from cache, key: ${key}`);

                return of(cachedItem.data);
            } else {
                this.removeItem(key);
            }
        }

        // tslint:disable-next-line:no-any
        return factory().pipe(map((value: any) => {
            this.setItem(key, value, options);

            return value;
        }));

    }

    removeItem(key: string): void {
        this._logger.debug(`Removing cache, key: ${key}`);
        this._cache.removeItem(key);
    }

    clear(): void {
        this._logger.debug('Clearing cache');
        this._cache.clear();
    }

    private getAppBuildNumberFromInfo(): string | undefined {
        if (this._cacheCheckInfo) {
            return this._cacheCheckInfo.appBuildNumber;
        }

        return undefined;
    }

    private getHashFromInfo(key: string): string | undefined {
        if (this._cacheCheckInfo &&
            this._cacheCheckInfo.itemInfo &&
            this._cacheCheckInfo.itemInfo[key]) {
            const itemInfo = this._cacheCheckInfo.itemInfo[key];

            return itemInfo.hash;
        }

        return undefined;
    }

    private getExpirationFromInfo(key: string): number | undefined {
        if (this._cacheCheckInfo &&
            this._cacheCheckInfo.itemInfo &&
            this._cacheCheckInfo.itemInfo[key]) {
            const itemInfo = this._cacheCheckInfo.itemInfo[key];

            return itemInfo.absoluteExpiration;
        }

        return undefined;
    }

    private isValid(key: string, cachedItem: CacheItem): boolean {
        let valid = cachedItem.data != null;
        if (!valid) {
            return false;
        }

        if (cachedItem.absoluteExpiration != null) {
            valid = cachedItem.absoluteExpiration > Date.now();
        }

        if (!valid) {
            return false;
        }

        if (cachedItem.localOnlyCache) {
            return true;
        }

        const appBuildNumber = this.getAppBuildNumberFromInfo();
        if (appBuildNumber) {
            valid = cachedItem.appBuildNumber === appBuildNumber;
            if (!valid) {
                return false;
            }
        }

        const cacheInfoHash = this.getHashFromInfo(key);
        if (cacheInfoHash) {
            valid = cachedItem.hash === cacheInfoHash;
            if (!valid) {
                return false;
            }
        }

        const cacheInfoExpiration = this.getExpirationFromInfo(key);
        if (cacheInfoExpiration != null) {
            valid = cachedItem.absoluteExpiration != null &&
                cachedItem.absoluteExpiration > cacheInfoExpiration;
            if (!valid) {
                return false;
            }
        }

        return true;
    }
}
