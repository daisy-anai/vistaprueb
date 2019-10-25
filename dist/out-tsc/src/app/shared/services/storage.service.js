import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
let StorageService = class StorageService {
    constructor(router) {
        this.router = router;
        this.currentSession = null;
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }
    isExpired() {
        var diaexpire = new Date(this.getCurrentSession().expire);
        let actual = new Date();
        return (diaexpire.getTime() < actual.getTime()) ? true : false;
    }
    ;
    setCurrentSession(session) {
        this.currentSession = session;
        this.localStorageService.setItem('currentUser', JSON.stringify(session));
    }
    loadSessionData() {
        var sessionStr = this.localStorageService.getItem('currentUser');
        return (sessionStr) ? JSON.parse(sessionStr) : null;
    }
    getCurrentSession() {
        return this.currentSession;
    }
    removeCurrentSession() {
        this.localStorageService.removeItem('currentUser');
        this.currentSession = null;
    }
    getCurrentUser() {
        var session = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    }
    ;
    isAuthenticated() {
        return (this.getCurrentToken() != null) ? true : false;
    }
    ;
    getCurrentToken() {
        var session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }
    ;
    getRole() {
        var session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    }
    ;
    logout() {
        this.removeCurrentSession();
    }
};
StorageService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], StorageService);
export { StorageService };
