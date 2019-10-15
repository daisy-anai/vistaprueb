import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarVehiculoComponent } from './buscar-vehiculo/buscar-vehiculo.component';

const routes: Routes = [
  { path: '', component: BuscarVehiculoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
