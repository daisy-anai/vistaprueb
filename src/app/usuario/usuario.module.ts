import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { ConcesionModule } from '../concesion/concesion.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';
import { CatalogoModule } from '../catalogo/catalogo.module';
import { VigenciasModule } from '../vigencias/vigencias.module';

// Components
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
    CatalogoModule,
    VigenciasModule
  ]
})
export class UsuarioModule { }
