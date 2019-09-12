import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User } from "../shared/models/user.model";
import { StorageService } from "../shared/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedAfterLoginGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    if (this.storageService.isAuthenticated()) {
      if(!this.storageService.isExpired()){
        this.redirect(this.storageService.getCurrentUser());
        return false;
      }else{
        this.storageService.logout();
      }
    }
    return true;
  }

  redirect(user: User){
    this.router.navigate(['/aplicacion']);
  }
}
