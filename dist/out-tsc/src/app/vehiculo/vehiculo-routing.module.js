import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuscarVehiculoComponent } from './buscar-vehiculo/buscar-vehiculo.component';
const routes = [
    { path: '', component: BuscarVehiculoComponent },
    { path: '**', redirectTo: '' }
];
let VehiculoRoutingModule = class VehiculoRoutingModule {
};
VehiculoRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], VehiculoRoutingModule);
export { VehiculoRoutingModule };
