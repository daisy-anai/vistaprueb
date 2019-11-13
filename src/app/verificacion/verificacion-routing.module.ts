import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CheckVerificacionComponent} from './check-verificacion/check-verificacion.component';

const routes : Routes=[
  {path:'',component:CheckVerificacionComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionRoutingModule { }
