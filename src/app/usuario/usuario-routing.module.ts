import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ListarCatalogoComponent } from '../catalogo/listar-catalogo/listar-catalogo.component'; 
import { CrearCatalogoComponent } from '../catalogo/crear-catalogo/crear-catalogo.component'; 
import { EditarCatalogoComponent } from '../catalogo/editar-catalogo/editar-catalogo.component';
import { DetalleCatalogoComponent } from '../catalogo/detalle-catalogo/detalle-catalogo.component';
import { ConcesionVehiculoComponent } from './concesion-vehiculo/concesion-vehiculo.component';

const routes: Routes = [
  
  {
    path: 'aplicacion',
    component: AplicacionComponent,
    children: [
      {
        path: 'inicio',
        component: ConcesionVehiculoComponent
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
            path: 'editar',
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
        redirectTo: 'inicio'
      }
    ]
  } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
