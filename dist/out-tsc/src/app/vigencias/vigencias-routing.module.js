import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrearVigenciasComponent } from './crear-vigencias/crear-vigencias.component';
import { ListarVigenciasComponent } from './listar-vigencias/listar-vigencias.component';
import { ModificarVigenciasComponent } from './modificar-vigencias/modificar-vigencias.component';
const routes = [
    { path: '', component: ListarVigenciasComponent },
    { path: 'crear', component: CrearVigenciasComponent },
    { path: 'modificar/:id', component: ModificarVigenciasComponent },
    { path: 'modalidad/:id', component: ListarVigenciasComponent },
    { path: '**', redirectTo: '' }
];
let VigenciasRoutingModule = class VigenciasRoutingModule {
};
VigenciasRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], VigenciasRoutingModule);
export { VigenciasRoutingModule };
