import {Injectable} from "@angular/core";
import { Router } from '@angular/router';

import {Session} from "../models/session";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  isExpired(): boolean {
    var diaexpire= new Date(this.getCurrentSession().expire);
    let actual = new Date();
    return (diaexpire.getTime() < actual.getTime()) ? true : false;
  };


  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): Boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): String {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  getRole(): String {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
  }

}
