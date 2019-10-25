import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
const routes = [
    {
        path: 'aplicacion',
        component: AplicacionComponent,
        data: { animation: 'Aplicacion' },
        children: [
            {
                path: 'concesion',
                loadChildren: () => import('../concesion/concesion.module').then(m => m.ConcesionModule)
            },
            {
                path: 'configuracion',
                loadChildren: () => import('../modalidad/modalidad.module').then(m => m.ModalidadModule)
            },
            {
                path: 'vigencias',
                loadChildren: () => import('../vigencias/vigencias.module').then(m => m.VigenciasModule)
            },
            {
                path: 'vehiculo',
                loadChildren: () => import('../vehiculo/vehiculo.module').then(m => m.VehiculoModule)
            },
            {
                path: 'catalogo',
                loadChildren: () => import('../catalogo/catalogo.module').then(m => m.CatalogoModule)
            },
            {
                path: '**',
                redirectTo: 'concesion'
            }
        ]
    }
];
let UsuarioRoutingModule = class UsuarioRoutingModule {
};
UsuarioRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], UsuarioRoutingModule);
export { UsuarioRoutingModule };
