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
import { ListaCatatalogoModalidadComponent } from './lista-catatalogo-modalidad/lista-catatalogo-modalidad.component';

@NgModule({
  declarations: [
    CrearCatalogoComponent,
    DetalleCatalogoComponent,
    EditarCatalogoComponent,
    ListarCatalogoComponent,
    ListaCatatalogoModalidadComponent
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
export class CatalogoModule { }
