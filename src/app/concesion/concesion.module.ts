import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscarConcesionComponent } from './buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from './detalle-concesion/detalle-concesion.component';

@NgModule({
  declarations: [
    BuscarConcesionComponent,
    DetalleConcesionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscarConcesionComponent,
    DetalleConcesionComponent
  ]
})
export class ConcesionModule { }
