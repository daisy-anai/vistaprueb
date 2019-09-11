import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturistaHomeComponent } from './capturista-home/capturista-home.component';

const routes: Routes = [
  {
    path: 'capturista',
    component: CapturistaHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturistaRoutingModule { }
