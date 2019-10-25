import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthorizatedAfterLoginGuard = class AuthorizatedAfterLoginGuard {
    constructor(router, storageService) {
        this.router = router;
        this.storageService = storageService;
    }
    canActivate() {
        if (this.storageService.isAuthenticated()) {
            if (!this.storageService.isExpired()) {
                this.redirect(this.storageService.getCurrentUser());
                return false;
            }
            else {
                this.storageService.logout();
            }
        }
        return true;
    }
    redirect(user) {
        this.router.navigate(['/aplicacion']);
    }
};
AuthorizatedAfterLoginGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthorizatedAfterLoginGuard);
export { AuthorizatedAfterLoginGuard };
