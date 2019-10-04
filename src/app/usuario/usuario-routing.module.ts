import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ListarCatalogoComponent } from '../catalogo/listar-catalogo/listar-catalogo.component';
import { CrearCatalogoComponent } from '../catalogo/crear-catalogo/crear-catalogo.component';
import { EditarCatalogoComponent } from '../catalogo/editar-catalogo/editar-catalogo.component';
import { DetalleCatalogoComponent } from '../catalogo/detalle-catalogo/detalle-catalogo.component';
import { BuscarConcesionComponent } from '../concesion/buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from '../concesion/detalle-concesion/detalle-concesion.component';
import { BuscarVehiculoComponent } from '../vehiculo/buscar-vehiculo/buscar-vehiculo.component';
<<<<<<< HEAD
import { ListaCatatalogoModalidadComponent } from '../catalogo/lista-catatalogo-modalidad/lista-catatalogo-modalidad.component';
=======
>>>>>>> 3a6f469e18097d200fd64e82d34062882812e45b

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent,
    data: { animation: 'Aplicacion' },
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
        path: 'vehiculo/busqueda',
        component: BuscarVehiculoComponent
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
            path:'listamodalidad/:id',
            component: ListaCatatalogoModalidadComponent
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
