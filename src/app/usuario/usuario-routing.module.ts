import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ListarCatalogoComponent } from '../catalogo/listar-catalogo/listar-catalogo.component';
import { CrearCatalogoComponent } from '../catalogo/crear-catalogo/crear-catalogo.component';
import { EditarCatalogoComponent } from '../catalogo/editar-catalogo/editar-catalogo.component';
import { DetalleCatalogoComponent } from '../catalogo/detalle-catalogo/detalle-catalogo.component';
import { BuscarConcesionComponent } from '../concesion/buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from '../concesion/detalle-concesion/detalle-concesion.component';

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent,
    data: { num: 1 },
    children: [
      {
        path: 'concesion/busqueda',
        component: BuscarConcesionComponent
      },
      {
        path: 'concesion/detalle',
        component: DetalleConcesionComponent
      },
      {
        path: 'catalogo',
        children: [
          {
            path: 'listar',
            component: ListarCatalogoComponent
          },
          {
            path: 'detalle/:id',
            component: DetalleCatalogoComponent
          },
          {
            path: 'crear',
            component: CrearCatalogoComponent
          },
          {
            path: 'editar/:id',
            component: EditarCatalogoComponent
          },
          {
            path: '**',
            redirectTo: 'listar'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'concesion/busqueda'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
