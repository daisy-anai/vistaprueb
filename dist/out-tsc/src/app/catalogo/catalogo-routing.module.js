import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Components
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';
const routes = [
    { path: '', component: ListarCatalogoComponent },
    { path: 'detalle/:id/:deprecated', component: DetalleCatalogoComponent },
    { path: 'crear/:id', component: CrearCatalogoComponent },
    { path: 'modificar/:id', component: EditarCatalogoComponent },
    { path: 'modalidad/:id', component: ListarCatalogoComponent },
    { path: '**', redirectTo: '' }
];
let CatalogoRoutingModule = class CatalogoRoutingModule {
};
CatalogoRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [RouterModule]
    })
], CatalogoRoutingModule);
export { CatalogoRoutingModule };
