import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
let AuthService = class AuthService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    login(correo, contrasena) {
        return this.apollo.use('servicios').watchQuery({
            query: gql `
        query autenticacion($correo:String, $contrasena:String, $tokenID:String){
          login(correo:$correo, password:$contrasena, tokenId:$tokenID){
            user {
              id
              nombre
              primer_apellido
              segundo_apellido
              correo
              centroTrabajo {
                id
                nombre
                region {
                  id
                  nombre
                  estatus
                  createdAt
                }
                estatus
                createdAt
              }
              estatus
              createdAt
            }
            role {
              id
              nombre
            }
            token
          }
        }
      `,
            variables: {
                correo: correo,
                contrasena: contrasena,
                tokenID: environment.tokenID
            }
        }).valueChanges;
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
