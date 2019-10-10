import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// Components
import { SemoviAppComponent } from './semovi-app/semovi-app.component';
import { SemoviRouterOutletComponent } from './semovi-router-outlet/semovi-router-outlet.component';
import { SemoviCardComponent } from './card/semovi-card/semovi-card.component';
import { SemoviCardHeaderComponent } from './card/semovi-card-header/semovi-card-header.component';
import { SemoviCardBodyComponent } from './card/semovi-card-body/semovi-card-body.component';
import { SemoviInputSearchComponent } from './input/semovi-input-search/semovi-input-search.component';
import { SemoviInputOptionsComponent } from './input/semovi-input-options/semovi-input-options.component';
import { SemoviListComponent } from './list/semovi-list/semovi-list.component';
import { SemoviItemComponent } from './item/semovi-item/semovi-item.component';
import { SemoviLabelGroupComponent } from './labels/semovi-label-group/semovi-label-group.component';
import { SemoviLabelComponent } from './labels/semovi-label/semovi-label.component';

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
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
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
  ]
})
export class ComponentsModule { }
