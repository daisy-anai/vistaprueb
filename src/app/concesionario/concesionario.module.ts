import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConcesionarioRoutingModule } from './concesionario-routing.module';
import { BuscarConcesionarioComponent } from './buscar-concesionario/buscar-concesionario.component';

@NgModule({
  declarations: [BuscarConcesionarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConcesionarioRoutingModule
  ],
  exports: [
    BuscarConcesionarioComponent
  ]
})
export class ConcesionarioModule { }
