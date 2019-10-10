import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { RevisionVehiculoComponent } from '../revision-cromatica/revision-vehiculo/revision-vehiculo.component';


const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent,
    data: { animation: 'Aplicacion' },
    children: [
      {
        path: 'modalidad',
        loadChildren: () => import ('../modalidad/modalidad.module').then(m => m.ModalidadModule )
      },
      {
        path: 'vigencias',
        loadChildren: () => import ('../vigencias/vigencias.module').then(m => m.VigenciasModule )
      },
      {
        path: 'concesion',
        loadChildren: () => import ('../concesion/concesion.module').then(m => m.ConcesionModule )
      },
      {
        path: 'vehiculo',
        loadChildren: () => import ('../vehiculo/vehiculo.module').then(m => m.VehiculoModule )
      },
      {
        path:'revision/vehiculo',
        component:RevisionVehiculoComponent
      },
      {
        path: 'catalogo',
        loadChildren: () => import ('../catalogo/catalogo.module').then(m => m.CatalogoModule )
      },
      {
        path: '**',
        redirectTo: 'concesion'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
