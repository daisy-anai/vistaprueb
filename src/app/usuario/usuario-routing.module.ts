import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Services
import { CatalogoService } from '../catalogo/catalogo.service';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ListarCatalogoComponent } from '../catalogo/listar-catalogo/listar-catalogo.component';
import { CrearCatalogoComponent } from '../catalogo/crear-catalogo/crear-catalogo.component';
import { EditarCatalogoComponent } from '../catalogo/editar-catalogo/editar-catalogo.component';
import { DetalleCatalogoComponent } from '../catalogo/detalle-catalogo/detalle-catalogo.component';
import { BuscarConcesionComponent } from '../concesion/buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from '../concesion/detalle-concesion/detalle-concesion.component';
import { BuscarVehiculoComponent } from '../vehiculo/buscar-vehiculo/buscar-vehiculo.component';
import { ListaCatatalogoModalidadComponent } from '../catalogo/lista-catatalogo-modalidad/lista-catatalogo-modalidad.component';
import { RevisionVehiculoComponent } from '../revision-cromatica/revision-vehiculo/revision-vehiculo.component';
import { CrearVigenciasComponent } from '../vigencias/crear-vigencias/crear-vigencias.component';
import { ModificarVigenciasComponent } from  '../vigencias/modificar-vigencias/modificar-vigencias.component';
import { ListarVigenciasComponent } from  '../vigencias/listar-vigencias/listar-vigencias.component';

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent,
    data: { animation: 'Aplicacion' },
    children: [
      {
        path: 'vigencias',
        children: [
          {
            path: 'crear',
            component: CrearVigenciasComponent
          },
          {
            path:'listar',
            component: ListarVigenciasComponent
          },
          {
            path:'modificar',
            component: ModificarVigenciasComponent
          },
          {
            path: '**',
            redirectTo: 'listar'
          }
        ]
      },
      {
        path: 'concesion',
        children: [
          {
            path: 'busqueda',
            component: BuscarConcesionComponent
          },
          {
            path: 'detalle',
            component: DetalleConcesionComponent
          },
          {
            path: '**',
            redirectTo: 'busqueda'
          }
        ],
      },
      {
        path: 'vehiculo',
        children: [
          {
            path: 'busqueda',
            component: BuscarVehiculoComponent
          }
        ]
      },
      {
        path:'revision/vehiculo',
        component:RevisionVehiculoComponent
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
            path: 'modificar/:id',
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
