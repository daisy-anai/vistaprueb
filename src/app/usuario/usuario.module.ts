import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { UsuarioRoutingModule } from './usuario-routing.module';

// Components
import { AplicacionComponent } from './aplicacion/aplicacion.component';

@NgModule({
  declarations: [
    AplicacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
