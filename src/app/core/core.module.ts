import {NgModule, Optional, SkipSelf} from '@angular/core';
import {StorageService} from "./services/storage.service";
import {AuthorizatedGuard} from "./guards/authorizated.guard";
import {AuthorizatedAfterLoginGuard} from "./guards/authorizatedafterlogin.guard";
import {ConvertNSService} from "./services/convertns.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    StorageService,
    AuthorizatedGuard,
    AuthorizatedAfterLoginGuard,
    ConvertNSService
  ],
  bootstrap: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
