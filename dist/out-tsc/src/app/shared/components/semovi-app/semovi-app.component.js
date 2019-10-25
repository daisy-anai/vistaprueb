import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
let SemoviAppComponent = class SemoviAppComponent {
    constructor(_loadingBar, _router) {
        this._loadingBar = _loadingBar;
        this._router = _router;
        this._router.events.subscribe((event) => {
            this.navigationInterceptor(event);
        });
    }
    navigationInterceptor(event) {
        if (event instanceof NavigationStart) {
            this._loadingBar.start();
        }
        if (event instanceof NavigationEnd) {
            this._loadingBar.complete();
        }
        if (event instanceof NavigationCancel) {
            this._loadingBar.stop();
        }
        if (event instanceof NavigationError) {
            this._loadingBar.stop();
        }
    }
};
SemoviAppComponent = tslib_1.__decorate([
    Component({
        selector: 'semovi-app',
        templateUrl: './semovi-app.component.html',
        styleUrls: ['./semovi-app.component.css']
    })
], SemoviAppComponent);
export { SemoviAppComponent };
