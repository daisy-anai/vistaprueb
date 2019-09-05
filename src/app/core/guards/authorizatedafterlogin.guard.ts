import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthorizatedAfterLoginGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate() {
    if (this.storageService.isAuthenticated()) {
      if(this.storageService.isExpired()){
        this.storageService.logout();
        this.router.navigate(['/login']);
      }
      this.router.navigate(['/application']);
    }else{
      this.storageService.logout();
      return true;
    }
    this.router.navigate(['/login']);
  }
}
