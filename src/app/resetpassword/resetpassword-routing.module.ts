import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResetpasswordComponent} from '../resetpassword/userpassword/resetpassword.component';

const routes: Routes=[
  {path:'**', component: ResetpasswordComponent},
 
]



@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetpasswordRoutingModule { }
