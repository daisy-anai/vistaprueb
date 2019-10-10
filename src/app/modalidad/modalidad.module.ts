import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalidadRoutingModule } from './modalidad-routing.module';
import { ListarModalidadComponent } from './listar-modalidad/listar-modalidad.component';

@NgModule({
  declarations: [ListarModalidadComponent],
  imports: [
    CommonModule,
    ModalidadRoutingModule
  ]
})
export class ModalidadModule { }
