import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { slideAnimation } from './transition';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideAnimation
  ]
})
export class AppComponent{
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private navigationService: NavigationService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
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

  private getRouteAnimation(outlet) {
    return this.navigationService.animationValue;
  }
}
