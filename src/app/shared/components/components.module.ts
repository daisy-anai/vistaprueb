import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// Components
import { SemoviAppComponent } from './semovi-app/semovi-app.component';
import { SemoviRouterOutletComponent } from './semovi-router-outlet/semovi-router-outlet.component';
import { SemoviCardComponent } from './semovi-card/semovi-card.component';
import { SemoviCardHeaderComponent } from './semovi-card-header/semovi-card-header.component';
import { SemoviCardBodyComponent } from './semovi-card-body/semovi-card-body.component';
import { SemoviInputSearchComponent } from './semovi-input-search/semovi-input-search.component';
import { SemoviInputOptionsComponent } from './semovi-input-options/semovi-input-options.component';
import { SemoviListComponent } from './semovi-list/semovi-list.component';
import { SemoviItemComponent } from './semovi-item/semovi-item.component';
import { SemoviLabelGroupComponent } from './semovi-label-group/semovi-label-group.component';
import { SemoviLabelComponent } from './semovi-label/semovi-label.component';
import { SemoviPreloadingComponent } from './semovi-preloading/semovi-preloading.component';

@NgModule({
  declarations: [
    SemoviCardComponent,
    SemoviCardHeaderComponent,
    SemoviCardBodyComponent,
    SemoviAppComponent,
    SemoviRouterOutletComponent,
    SemoviInputSearchComponent,
    SemoviInputOptionsComponent,
    SemoviListComponent,
    SemoviItemComponent,
    SemoviLabelComponent,
    SemoviLabelGroupComponent,
    SemoviPreloadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlimLoadingBarModule,
  ],
  exports: [
    SemoviAppComponent,
    SemoviRouterOutletComponent,
    SemoviCardComponent,
    SemoviCardHeaderComponent,
    SemoviCardBodyComponent,
    SemoviInputSearchComponent,
    SemoviInputOptionsComponent,
    SemoviListComponent,
    SemoviItemComponent,
    SemoviLabelComponent,
    SemoviLabelGroupComponent,
    SemoviPreloadingComponent
  ]
})
export class ComponentsModule { }
