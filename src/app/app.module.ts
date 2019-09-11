import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SupervisorModule } from './supervisor/supervisor.module';
import { CapturistaModule } from './capturista/capturista.module';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    BrowserAnimationsModule,
    SupervisorModule,
    CapturistaModule,
    UserModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
