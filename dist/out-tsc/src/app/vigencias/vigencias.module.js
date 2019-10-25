import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing
import { VigenciasRoutingModule } from './vigencias-routing.module';
// Components
import { CrearVigenciasComponent } from './crear-vigencias/crear-vigencias.component';
import { ListarVigenciasComponent } from './listar-vigencias/listar-vigencias.component';
import { ModificarVigenciasComponent } from './modificar-vigencias/modificar-vigencias.component';
import { ComponentsModule } from '../shared/components/components.module';
let VigenciasModule = class VigenciasModule {
};
VigenciasModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            CrearVigenciasComponent,
            ListarVigenciasComponent,
            ModificarVigenciasComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            VigenciasRoutingModule,
            ComponentsModule
        ]
    })
], VigenciasModule);
export { VigenciasModule };
