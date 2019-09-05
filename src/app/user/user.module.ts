import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { ApplicationComponent } from './application/application.component';
import { BuscarConcesionarioComponent } from './buscar-concesionario/buscar-concesionario.component';
import { BuscarVehiculoComponent } from './buscar-vehiculo/buscar-vehiculo.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    BuscarConcesionarioComponent,
    BuscarVehiculoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
