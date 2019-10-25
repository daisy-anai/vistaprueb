import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthorizatedAfterLoginGuard } from './authorizatedafterlogin.guard';
const routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthorizatedAfterLoginGuard],
        data: { animation: 'Login' }
    }
];
let AuthRoutingModule = class AuthRoutingModule {
};
AuthRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AuthRoutingModule);
export { AuthRoutingModule };
