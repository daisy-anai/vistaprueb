import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
// Servicios
import { environment } from '../../../environments/environment';
// Modelos
import { Session } from "../../shared/models/session";
import { User } from "../../shared/models/user";
import { Rol } from "../../shared/models/rol";
let LoginComponent = class LoginComponent {
    constructor(apollo, router, storageService, authService) {
        this.apollo = apollo;
        this.router = router;
        this.storageService = storageService;
        this.authService = authService;
    }
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
    login() {
        var CryptoJS = require("crypto-js");
        let email = this.loginForm.controls['email_inline'].value;
        let password = this.loginForm.controls['password'].value;
        password = CryptoJS.AES.encrypt(password, environment.__encrypt).toString();
        this.authService.login(email, password).subscribe(result => {
            this.correctlogincheck(result.data);
        }, (error) => {
            var divisiones = error.message.split(":", 2);
            var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;' + divisiones[1] + '</div></span>';
            M.toast({ html: toastHTML });
        });
    }
    /* Parseo del objeto que me regresa el mandar los parametros del login*/
    correctlogincheck(objlogin) {
        let newseccion = new Session();
        newseccion.token = objlogin.login.token;
        let dialogeo = new Date();
        let finsession = new Date();
        finsession.setMinutes(dialogeo.getMinutes() + 120);
        newseccion.expire = finsession;
        let rol = new Rol();
        rol.id = objlogin.login.role.id;
        rol.nombre = objlogin.login.role.nombre;
        let user = new User();
        user.id = objlogin.login.user.id;
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
    redirect(user) {
        this.router.navigate(['/aplicacion']);
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
