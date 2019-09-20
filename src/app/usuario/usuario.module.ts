import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConcesionModule } from '../concesion/concesion.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';
import { CatalogoModule } from '../catalogo/catalogo.module'; 

import { UsuarioRoutingModule } from './usuario-routing.module';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { PlantillasCromaticaComponent } from './plantillas-cromatica/plantillas-cromatica.component';
import { ReporteCromaticaComponent } from './reporte-cromatica/reporte-cromatica.component';
import { ReporteFinalCromaticaComponent } from './reporte-final-cromatica/reporte-final-cromatica.component';
import { CrearPlantillaComponent } from './crear-plantilla/crear-plantilla.component';
import { ListarPlantillaComponent } from './listarPlantilla/listarPlantilla.component';

@NgModule({
  declarations: [
    AplicacionComponent,
    PlantillasCromaticaComponent,
    ReporteCromaticaComponent,
    ReporteFinalCromaticaComponent,
    CrearPlantillaComponent,
    ListarPlantillaComponent
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
