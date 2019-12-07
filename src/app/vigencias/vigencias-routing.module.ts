import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearVigenciasComponent } from './crear-vigencias/crear-vigencias.component';
import { ListarVigenciasComponent } from  './listar-vigencias/listar-vigencias.component';
import { ModificarVigenciasComponent } from  './modificar-vigencias/modificar-vigencias.component';


const routes: Routes = [
  { path: '', component: ListarVigenciasComponent },
  { path: 'crear/:id', component: CrearVigenciasComponent },
  { path: 'modificar/:id', component: ModificarVigenciasComponent },
  { path: 'modalidad/:id', component: ListarVigenciasComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VigenciasRoutingModule { }
