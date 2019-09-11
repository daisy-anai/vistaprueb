import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcesionModule } from '../concesion/concesion.module';

import { CapturistaRoutingModule } from './capturista-routing.module';
import { CapturistaHomeComponent } from './capturista-home/capturista-home.component';


@NgModule({
  declarations: [
    CapturistaHomeComponent
  ],
  imports: [
    CommonModule,
    ConcesionModule,
    CapturistaRoutingModule
  ]
})
export class CapturistaModule { }
