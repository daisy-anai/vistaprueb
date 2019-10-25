import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LoginComponent
        ],
        imports: [
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            AuthRoutingModule
        ]
    })
], AuthModule);
export { AuthModule };
