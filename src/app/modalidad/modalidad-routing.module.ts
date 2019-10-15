import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarModalidadComponent } from './listar-modalidad/listar-modalidad.component';

const routes: Routes = [
  { path: '', component: ListarModalidadComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalidadRoutingModule { }
