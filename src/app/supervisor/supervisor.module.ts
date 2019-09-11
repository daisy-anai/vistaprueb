import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcesionModule } from '../concesion/concesion.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorHomeComponent } from './supervisor-home/supervisor-home.component';

@NgModule({
  declarations: [
    SupervisorHomeComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    ConcesionModule,
    VehiculoModule
  ]
})
export class SupervisorModule { }
