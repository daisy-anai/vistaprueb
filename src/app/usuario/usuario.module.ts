import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConcesionModule } from '../concesion/concesion.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { PlantillasCromaticaComponent } from './plantillas-cromatica/plantillas-cromatica.component';


@NgModule({
  declarations: [
    AplicacionComponent,
    PlantillasCromaticaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    ConcesionModule,
    VehiculoModule
  ]
})
export class UsuarioModule { }
