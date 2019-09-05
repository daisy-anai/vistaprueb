import {Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {KEY} from "../../core/key/key-api";
import {ENCRIPT} from "../../core/key/encript";

import {StorageService} from "../../core/services/storage.service";
import {Session} from "../../core/models/session.model";
import {User} from "../../core/models/user.model";
import {Role} from "../../core/models/role.model";

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  submitted: Boolean = false;
  error: {code: number, message: string} = null;
  name: string;
  apellido: string;
  loged: boolean = false;
  validemail: boolean = false;

  constructor(
    private apollo?: Apollo,
    private storageService?: StorageService,
    private router?: Router
  ){}

  ngOnInit() {
    let RegExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.user = this.storageService.getCurrentUser();
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

  /*
    Funcion que manda el correo y password para que se genere el token y
    el inicio de sesion, el password se encripta con una llave para que
    vaya encriptada
  */
  login(){
    let email = this.loginForm.controls['email_inline'].value;
    let password = this.loginForm.controls['password'].value;

    let url = KEY.HOME_URL;
    var CryptoJS = require("crypto-js");
    let encript = ENCRIPT.HOME_URL;

    password = CryptoJS.AES.encrypt(password, ENCRIPT.HOME_URL).toString();

    this.submitted = true;
    this.error = null;
    this.apollo.use('servicios').watchQuery({
      query: gql`
      query knock_knock($email:String,$passwd:String,$tI:String){
        login(correo:$email,password:$passwd,tokenId:$tI){
          user{id,nombre,primer_apellido,segundo_apellido,correo
            centroTrabajo{id,nombre,
              region{id,nombre,estatus,createdAt},
              estatus,createdAt},
              estatus,createdAt},
              role{ id, nombre }
              token
            }
          },
      ` ,
      variables: {
        email: email,
        passwd: password,
        tI: KEY.HOME_URL
    }})
    .valueChanges.subscribe(result => {
      this.correctlogincheck(result.data);
     }, (error) => {
       var divisiones = error.message.split(":", 2);
       var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+divisiones[1]+'</div></span>';
       M.toast({html: toastHTML});
     });
 }

  /* Parseo del objeto que me regresa el mandar los parametros del login*/
  correctlogincheck(objlogin: any){
    let newseccion = new Session();
    newseccion.token = objlogin.login.token;
    let dialogeo = new Date();
    let finsession = new Date();
    finsession.setMinutes(dialogeo.getMinutes() + 120);
    newseccion.expire = finsession;

    let user = new User();
    user.id = objlogin.login.user.id
    user.nombre = objlogin.login.user.nombre;
    user.primer_apellido = objlogin.login.user.primer_apellido;
    user.segundo_apellido = objlogin.login.user.segundo_apellido;
    user.correo = objlogin.login.user.correo;
    user.password = objlogin.login.user.password;
    user.id_rol = objlogin.login.role.id;
    user.id_centro_trabajo = objlogin.login.user.centroTrabajo.id;
    user.id_region = objlogin.login.user.centroTrabajo.region.id;
    newseccion.user = user;

    this.storageService.setCurrentSession(newseccion);
    this.router.navigate(['/application']);
  }
}
