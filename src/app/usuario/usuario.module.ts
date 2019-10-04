import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConcesionModule } from '../concesion/concesion.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';
import { CatalogoModule } from '../catalogo/catalogo.module';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ReporteCromaticaComponent } from './reporte-cromatica/reporte-cromatica.component';
import { ReporteFinalCromaticaComponent } from './reporte-final-cromatica/reporte-final-cromatica.component';

@NgModule({
  declarations: [
    AplicacionComponent,
    ReporteCromaticaComponent,
    ReporteFinalCromaticaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    ConcesionModule,
    VehiculoModule,
    CatalogoModule
  ]
})
export class UsuarioModule { }
