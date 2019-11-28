import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// Servicios
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { StorageService } from "../../shared/services/storage.service";

// Modelos
import { Session } from "../../shared/models/session";
import { User } from "../../shared/models/user";
import { Rol } from "../../shared/models/rol";

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loading : boolean= false;
  constructor(
    private apollo?: Apollo,
    private router?: Router,
    private storageService?: StorageService,
    private authService?: AuthService
  ){}

  ngOnInit() {
    let RegExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.loginForm = new FormGroup({
      email_inline: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(RegExpEmail)
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  login(){
    var CryptoJS = require("crypto-js");

    let email = this.loginForm.controls['email_inline'].value;
    let password = this.loginForm.controls['password'].value;
    password = CryptoJS.AES.encrypt(password, environment.__encrypt).toString();
    this.loading= true;
    let activeElement = <HTMLElement>document.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
    this.authService.login(email, password).subscribe(result => {
      this.correctlogincheck(result.data);
      this.loading= false;
    }, (error) => {
      var divisiones = error.message.split(":", 2);
      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+divisiones[1]+'</div></span>';
      M.toast({html: toastHTML});
    });
 }

  /* Parseo del objeto que me regresa el mandar los parametros del login*/
  correctlogincheck(objlogin: any){
    let newseccion: Session = new Session();

    newseccion.token = objlogin.login.token;
    let dialogeo = new Date();
    let finsession = new Date();
    finsession.setMinutes(dialogeo.getMinutes() + 120);
    newseccion.expire = finsession;

    let rol: Rol = new Rol();
    rol.id = objlogin.login.role.id;
    rol.nombre = objlogin.login.role.nombre;

    let user: User = new User();
    user.id = objlogin.login.user.id
    user.nombre = objlogin.login.user.nombre;
    user.primer_apellido = objlogin.login.user.primer_apellido;
    user.segundo_apellido = objlogin.login.user.segundo_apellido;
    user.correo = objlogin.login.user.correo;
    user.password = objlogin.login.user.password;
    user.rol = rol;
    user.id_centro_trabajo = objlogin.login.user.centroTrabajo.id;
    user.id_region = objlogin.login.user.centroTrabajo.region.id;
    newseccion.user = user;

    this.storageService.setCurrentSession(newseccion);
    this.redirect(user);
  }

  redirect(user: User){
    this.router.navigate(['/aplicacion']);
  }

}
