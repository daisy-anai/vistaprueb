import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConcesionModule } from '../concesion/concesion.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { PlantillasCromaticaComponent } from './plantillas-cromatica/plantillas-cromatica.component';
import { ReporteCromaticaComponent } from './reporte-cromatica/reporte-cromatica.component';
import { ReporteFinalCromaticaComponent } from './reporte-final-cromatica/reporte-final-cromatica.component';

@NgModule({
  declarations: [
    AplicacionComponent,
    PlantillasCromaticaComponent,
    ReporteCromaticaComponent,
    ReporteFinalCromaticaComponent
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
