import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ComponentsModule } from '../shared/components/components.module';

// Components
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';
import { ListaCatatalogoModalidadComponent } from './lista-catatalogo-modalidad/lista-catatalogo-modalidad.component';

// Directives
import { ValidoDirective } from '../shared/directives/valido.directive';
import { CardDirective } from '../shared/directives/card.directive';

// Pipes
import { SearchPipe } from '../shared/filters/search.pipe';

@NgModule({
  declarations: [
    CrearCatalogoComponent,
    DetalleCatalogoComponent,
    EditarCatalogoComponent,
    ListarCatalogoComponent,
    ValidoDirective,
    CardDirective,
    ListaCatatalogoModalidadComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
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
