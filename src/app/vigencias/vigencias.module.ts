import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components 
import { CrearVigenciasComponent } from './crear-vigencias/crear-vigencias.component';
import { ListarVigenciasComponent } from './listar-vigencias/listar-vigencias.component';
import { ModificarVigenciasComponent } from './modificar-vigencias/modificar-vigencias.component';
       
@NgModule({
  declarations: [
    CrearVigenciasComponent,
    ListarVigenciasComponent,
    ModificarVigenciasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [
    CrearVigenciasComponent,
    ListarVigenciasComponent,
    ModificarVigenciasComponent
  ]
})
export class VigenciasModule { }
