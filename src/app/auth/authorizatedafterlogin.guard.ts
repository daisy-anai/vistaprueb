import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from "../shared/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedAfterLoginGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    if (this.storageService.isAuthenticated()) {
      if(!this.storageService.isExpired()){
        this.router.navigate(['/application']);
        return false;
      }else{
        this.storageService.logout();
      }
    }
    return true;
  }
}
