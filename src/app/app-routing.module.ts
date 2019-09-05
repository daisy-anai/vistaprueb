import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthorizatedAfterLoginGuard} from "./core/guards/authorizatedafterlogin.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
