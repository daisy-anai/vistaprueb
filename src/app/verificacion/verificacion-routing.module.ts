import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CheckVerificacionComponent} from './check-verificacion/check-verificacion.component';
import {SeleccionCatalogoComponent } from './seleccion-catalogo/seleccion-catalogo.component';
import { ReporteFinalCromaticaComponent} from './reporte-final-cromatica/reporte-final-cromatica.component';
const routes : Routes=[
  {path:'check/:id',component:CheckVerificacionComponent},
  {path:'seleccion/:id', component:SeleccionCatalogoComponent},
  {path: 'constancia', component:ReporteFinalCromaticaComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionRoutingModule { }
