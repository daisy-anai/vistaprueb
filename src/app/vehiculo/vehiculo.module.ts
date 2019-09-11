import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscarVehiculoComponent } from './buscar-vehiculo/buscar-vehiculo.component';

@NgModule({
  declarations: [
    BuscarVehiculoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscarVehiculoComponent
  ]
})
export class VehiculoModule { }
