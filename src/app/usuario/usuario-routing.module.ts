import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacionComponent } from './aplicacion/aplicacion.component';

const routes: Routes = [
  {
    path: 'aplicacion',
    component: AplicacionComponent,
    data: { animation: 'Aplicacion' },
    children: [
      {
        path: 'concesion',
        loadChildren: () => import ('../concesion/concesion.module').then(m => m.ConcesionModule )
      },
      {
        path: 'configuracion',
        loadChildren: () => import ('../modalidad/modalidad.module').then(m => m.ModalidadModule )
      },
      {
        path: 'vigencias',
        loadChildren: () => import ('../vigencias/vigencias.module').then(m => m.VigenciasModule )
      },
      {
        path: 'catalogo',
        loadChildren: () => import ('../catalogo/catalogo.module').then(m => m.CatalogoModule )
      },
      {
        path: 'vehiculo',
        loadChildren: () => import ('../vehiculo/vehiculo.module').then(m => m.VehiculoModule )
      },
      {
        path:'verificacion',
        loadChildren:()=> import ('../verificacion/verificacion.module').then(m  => m.VerificacionModule)
      },
      {
        path:'usuario',
        loadChildren:()=> import ('../resetpassword/resetpassword.module').then(m => m.ResetpasswordModule)
      },
      {
        path:'actividades',
        loadChildren:()=> import('../reporte-actividades/reporte-actividades.module').then(m => m.ReporteActividadesModule)
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
