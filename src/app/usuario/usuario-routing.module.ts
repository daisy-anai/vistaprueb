import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { PlantillasCromaticaComponent } from './plantillas-cromatica/plantillas-cromatica.component';
import { ListarPlantillaComponent } from './listarPlantilla/listarPlantilla.component';

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent,

    children: [
      {
        path:'plantilla-croma',
        component:PlantillasCromaticaComponent
      }
    ]
  },
  {
    path: 'plantillas',
    component: PlantillasCromaticaComponent
  },
  {
    path:'listarPlantillas',
    component:ListarPlantillaComponent,

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
