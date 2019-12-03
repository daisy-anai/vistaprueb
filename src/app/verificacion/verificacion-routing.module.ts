import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CheckVerificacionCromaticaComponent} from './check-verificacion-cromatica/check-verificacion-cromatica.component';
import { SeleccionCatalogoComponent } from './seleccion-catalogo/seleccion-catalogo.component';
import { CheckVerificacionFisicoMecanicaComponent } from './check-verificacion-fisico-mecanica/check-verificacion-fisico-mecanica.component'
import { SeleccionCromaticaComponent } from './seleccion-cromatica/seleccion-cromatica.component';
import{ SeleccionFisicoMecanicaComponent } from './seleccion-fisico-mecanica/seleccion-fisico-mecanica.component';

const routes : Routes=[
  {path:'cromatica/:id',component:CheckVerificacionCromaticaComponent},
  {path:'plantilla/:id', component:SeleccionCatalogoComponent},
  {path:'fisicoMecanica/:id', component: CheckVerificacionFisicoMecanicaComponent },
  {path: 'cromatica/seleccion/:id', component: SeleccionCromaticaComponent},
  {path: 'fisicoMecanica/seleccion/:id', component: SeleccionFisicoMecanicaComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionRoutingModule { }
