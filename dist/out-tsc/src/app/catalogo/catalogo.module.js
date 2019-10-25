import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modules
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { FiltersModule } from '../shared/filters/filters.module';
import { ComponentsModule } from '../shared/components/components.module';
// Components
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';
let CatalogoModule = class CatalogoModule {
};
CatalogoModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            CrearCatalogoComponent,
            DetalleCatalogoComponent,
            EditarCatalogoComponent,
            ListarCatalogoComponent,
        ],
        imports: [
            CommonModule,
            CatalogoRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            ComponentsModule,
            FiltersModule
        ]
    })
], CatalogoModule);
export { CatalogoModule };
