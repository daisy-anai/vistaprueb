import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { UsuarioRoutingModule } from './usuario-routing.module';

// Modules
import { ComponentsModule } from '../shared/components/components.module';

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
    ComponentsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
