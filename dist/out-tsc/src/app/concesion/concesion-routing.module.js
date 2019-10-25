import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Components
import { BuscarConcesionComponent } from './buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from './detalle-concesion/detalle-concesion.component';
const routes = [
    { path: '', component: BuscarConcesionComponent },
    { path: 'detalle', component: DetalleConcesionComponent },
    { path: '**', redirectTo: '' }
];
let ConcesionRoutingModule = class ConcesionRoutingModule {
};
ConcesionRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ConcesionRoutingModule);
export { ConcesionRoutingModule };
