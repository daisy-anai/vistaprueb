import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ApplicationComponent } from './application/application.component';
import { ConcesionarioModule } from "../concesionario/concesionario.module";

@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ConcesionarioModule,
    UserRoutingModule
  ]
})
export class UserModule { }
