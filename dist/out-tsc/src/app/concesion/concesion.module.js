import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing
import { ConcesionRoutingModule } from './concesion-routing.module';
// Modules
import { ComponentsModule } from '../shared/components/components.module';
// Components
import { BuscarConcesionComponent } from './buscar-concesion/buscar-concesion.component';
import { DetalleConcesionComponent } from './detalle-concesion/detalle-concesion.component';
let ConcesionModule = class ConcesionModule {
};
ConcesionModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            BuscarConcesionComponent,
            DetalleConcesionComponent,
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ComponentsModule,
            ConcesionRoutingModule
        ]
    })
], ConcesionModule);
export { ConcesionModule };
