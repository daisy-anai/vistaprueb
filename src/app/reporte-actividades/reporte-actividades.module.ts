import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routing
import { ReporteActiviadesRoutingModule } from './reporte-activiades-routing.module';
//components
import { ActividadesComponent } from './actividades/actividades.component';
import { ComponentsModule } from '../shared/components/components.module';
import {HistorialActividadesComponent } from '../reportes/historial-actividades/historial-actividades.component';

@NgModule({
  declarations: [
    ActividadesComponent,
    HistorialActividadesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    ReporteActiviadesRoutingModule,
    
  ]
})
export class ReporteActividadesModule { }
