import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application/application.component';
import { BuscarConcesionarioComponent } from './buscar-concesionario/buscar-concesionario.component';
import { BuscarVehiculoComponent } from './buscar-vehiculo/buscar-vehiculo.component';
import { AuthorizatedGuard } from '../core/guards/authorizated.guard';

const routes: Routes = [
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthorizatedGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'concesionario/:id',
            component: BuscarVehiculoComponent
          },
          {
            path: '',
            component: BuscarConcesionarioComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
