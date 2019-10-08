import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components 
import { CrearVigenciasComponent } from './crear-vigencias/crear-vigencias.component';

@NgModule({
  declarations: [
    CrearVigenciasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VigenciasModule { }
