export interface CacheItem {
    // tslint:disable-next-line:no-any
    data: any;
    localOnlyCache?: boolean;
    appBuildNumber?: string;
    hash?: string;
    absoluteExpiration?: number;
}
