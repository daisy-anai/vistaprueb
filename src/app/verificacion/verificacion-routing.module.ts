import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CheckVerificacionCromaticaComponent} from './check-verificacion-cromatica/check-verificacion-cromatica.component';
import { SeleccionCatalogoComponent } from './seleccion-catalogo/seleccion-catalogo.component';
import { CheckVerificacionFisicoMecanicaComponent } from './check-verificacion-fisico-mecanica/check-verificacion-fisico-mecanica.component'
const routes : Routes=[
  {path:'cromatica/:id',component:CheckVerificacionCromaticaComponent},
  {path:'seleccion/:id', component:SeleccionCatalogoComponent},
  {path:'fisicoMecanica', component: CheckVerificacionFisicoMecanicaComponent },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionRoutingModule { }
