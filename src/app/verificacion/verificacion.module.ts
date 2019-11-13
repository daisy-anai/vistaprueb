import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routing
import { VerificacionRoutingModule} from './verificacion-routing.module';

// Modules
import { ComponentsModule } from '../shared/components/components.module';

//components
import { CheckVerificacionComponent} from './check-verificacion/check-verificacion.component';

@NgModule({
  declarations: [
    CheckVerificacionComponent
  ],
  imports: [
    VerificacionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class VerificacionModule { }
