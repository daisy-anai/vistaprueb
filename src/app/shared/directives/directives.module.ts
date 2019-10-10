import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { ComponentContainerDirective } from './component-container.directive';

@NgModule({
  declarations: [
    ComponentContainerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentContainerDirective
  ],
})
export class DirectivesModule { }
