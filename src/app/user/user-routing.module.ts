import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application/application.component';
import { AuthorizatedGuard } from '../core/guards/authorizated.guard';

const routes: Routes = [
  { path: 'application', component: ApplicationComponent, canActivate: [ AuthorizatedGuard ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
