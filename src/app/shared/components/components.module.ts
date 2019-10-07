import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleAreaComponent } from './title-area/title-area.component';

@NgModule({
  declarations: [
    TitleAreaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleAreaComponent
  ]
})
export class ComponentsModule { }
