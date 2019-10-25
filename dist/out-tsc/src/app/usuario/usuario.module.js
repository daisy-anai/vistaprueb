import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing
import { UsuarioRoutingModule } from './usuario-routing.module';
// Modules
import { ComponentsModule } from '../shared/components/components.module';
// Components
import { AplicacionComponent } from './aplicacion/aplicacion.component';
let UsuarioModule = class UsuarioModule {
};
UsuarioModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AplicacionComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ComponentsModule,
            UsuarioRoutingModule
        ]
    })
], UsuarioModule);
export { UsuarioModule };
