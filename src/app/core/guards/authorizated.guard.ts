import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,
   ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthorizatedGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url){
    if (this.storageService.isAuthenticated())
      if(!this.storageService.isExpired())
        return true;

    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(){
    return true;
  };
}
