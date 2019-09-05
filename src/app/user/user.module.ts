import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ApplicationComponent } from './application/application.component';


@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
