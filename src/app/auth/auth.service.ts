import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo?: Apollo){

  }

  login(correo: String, contrasena: String){
    return this.apollo.use('servicios').watchQuery({
      query: gql`
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
}
