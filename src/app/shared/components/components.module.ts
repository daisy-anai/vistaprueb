import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { SemoviCardComponent } from './semovi-card/semovi-card.component';
import { SemoviCardHeaderComponent } from './semovi-card-header/semovi-card-header.component';
import { SemoviCardBodyComponent } from './semovi-card-body/semovi-card-body.component';

@NgModule({
  declarations: [
    SemoviCardComponent,
    SemoviCardHeaderComponent,
    SemoviCardBodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SemoviCardComponent,
    SemoviCardHeaderComponent,
    SemoviCardBodyComponent
  ]
})
export class ComponentsModule { }
