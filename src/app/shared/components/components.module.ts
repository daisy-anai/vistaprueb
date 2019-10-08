import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TitleAreaComponent } from './title-area/title-area.component';

@NgModule({
  declarations: [
    TitleAreaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TitleAreaComponent
  ]
})
export class ComponentsModule { }
