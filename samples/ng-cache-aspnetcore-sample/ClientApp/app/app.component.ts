import { Component, OnInit } from '@angular/core';

import { CacheService } from '@bizappframework/ng-cache';
import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/shared/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    users: Observable<string[]>;

    constructor(private readonly _userService: UserService, private readonly _cacheService: CacheService) {
    }

    ngOnInit(): void {
        this.users = this._userService.getUsers();
    }

    clearCache(): void {
        this._cacheService.clear();
    }
}
