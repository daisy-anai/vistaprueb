import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Modules
import { ComponentsModule } from './shared/components/components.module';
import { AuthModule } from "./auth/auth.module";
import { UsuarioModule } from './usuario/usuario.module';
// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            FormsModule,
            GraphQLModule,
            ComponentsModule,
            AuthModule,
            UsuarioModule,
            AppRoutingModule,
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
