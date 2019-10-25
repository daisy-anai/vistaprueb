import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarModalidadComponent } from './listar-modalidad/listar-modalidad.component';
const routes = [
    { path: '', component: ListarModalidadComponent },
    { path: '**', redirectTo: '' }
];
let ModalidadRoutingModule = class ModalidadRoutingModule {
};
ModalidadRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ModalidadRoutingModule);
export { ModalidadRoutingModule };
