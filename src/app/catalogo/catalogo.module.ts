import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';


@NgModule({
  declarations: [
    CrearCatalogoComponent, 
    DetalleCatalogoComponent, 
    EditarCatalogoComponent, 
    ListarCatalogoComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule
  ],
  exports: [
    CrearCatalogoComponent, 
    DetalleCatalogoComponent, 
    EditarCatalogoComponent, 
    ListarCatalogoComponent
  ]
})
export class CatalogoModule { }
