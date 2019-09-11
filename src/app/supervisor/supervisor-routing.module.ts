import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorHomeComponent } from './supervisor-home/supervisor-home.component';

const routes: Routes = [
  {
    path: 'supervisor',
    component: SupervisorHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
