import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { ModalidadRoutingModule } from './modalidad-routing.module';

// Modules
import { ComponentsModule } from '../shared/components/components.module';
import { FiltersModule } from '../shared/filters/filters.module';
// Components
import { ListarModalidadComponent } from './listar-modalidad/listar-modalidad.component';

@NgModule({
  declarations: [
    ListarModalidadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalidadRoutingModule,
    ComponentsModule,
    FiltersModule
  ]
})
export class ModalidadModule { }
