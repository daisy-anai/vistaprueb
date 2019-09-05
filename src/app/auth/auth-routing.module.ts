import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthorizatedAfterLoginGuard } from '../core/guards/authorizatedafterlogin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ AuthorizatedAfterLoginGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
