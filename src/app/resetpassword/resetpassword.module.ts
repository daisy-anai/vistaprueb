import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent} from '../resetpassword/userpassword/resetpassword.component';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
  declarations: [
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ResetpasswordModule { }
