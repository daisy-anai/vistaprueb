import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modules
import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ComponentsModule } from '../shared/components/components.module';
// Components
import { BuscarVehiculoComponent } from './buscar-vehiculo/buscar-vehiculo.component';
let VehiculoModule = class VehiculoModule {
};
VehiculoModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            BuscarVehiculoComponent
        ],
        imports: [
            CommonModule,
            VehiculoRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            ComponentsModule
        ],
        exports: [
            BuscarVehiculoComponent
        ]
    })
], VehiculoModule);
export { VehiculoModule };
