import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BuscarConcesionComponent } from './buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from './detalle-concesion/detalle-concesion.component';

const routes: Routes = [
  { path: '', component: BuscarConcesionComponent },
  { path: 'detalle', component: DetalleConcesionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcesionRoutingModule { }
