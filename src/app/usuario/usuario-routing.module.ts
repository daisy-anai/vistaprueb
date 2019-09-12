import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { PlantillasCromaticaComponent } from './plantillas-cromatica/plantillas-cromatica.component';

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent
  },
  {
    path: 'plantillas',
    component: PlantillasCromaticaComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
