import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';

import { ValidoDirective } from '../shared/directives/valido.directive';
import { CardDirective } from '../shared/directives/card.directive';
import { ListaCatatalogoModalidadComponent } from './lista-catatalogo-modalidad/lista-catatalogo-modalidad.component';

@NgModule({
  declarations: [
    CrearCatalogoComponent,
    DetalleCatalogoComponent,
    EditarCatalogoComponent,
    ListarCatalogoComponent,
    ValidoDirective,
    CardDirective,
    ListaCatatalogoModalidadComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CrearCatalogoComponent,
    DetalleCatalogoComponent,
    EditarCatalogoComponent,
    ListarCatalogoComponent,
    ListaCatatalogoModalidadComponent
  ]
})
export class CatalogoModule { }
