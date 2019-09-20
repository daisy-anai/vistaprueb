import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(private apollo?: Apollo){

  }

  getCatalogos(){
    return this.apollo.use('backrevista').watchQuery({
        query: gql`
          query getCatalogos {
            catalogos {
              id
              nombre
              estatus
              createdAt
              tipoCatalogo {
                id
                nombre
                estatus
                createdAt
              }
              modalidad {
                id
                nombre
                descripcion
                estatus
                abreviatura
              }
              secciones {
                id
                nombre
                propiedades {
                  id
                  nombre
                  tipoPropiedad {
                    id
                    nombre
                    estatus
                    createdAt
                  }
                }
                estatus
                createdAt
              }
            }
          }
        `,
        variables: {
        }
    }).valueChanges; 
  }

  getCatalogoByID(id:Number){
    return this.apollo.use('backrevista').watchQuery({
        query: gql`
          query getCatalogo($id:ID!) {
            catalogo(id:$id) {
              id
              nombre
              estatus
              createdAt
              tipoCatalogo {
                id
                nombre
                estatus
                createdAt
              }
              modalidad {
                id
                nombre
                descripcion
                estatus
                abreviatura
              }
              secciones {
                id
                nombre
                propiedades {
                  id
                  nombre
                  tipoPropiedad {
                    id
                    nombre
                    estatus
                    createdAt
                  }
                }
                estatus
                createdAt
              }
            }
          }
        `,
        variables: {
          id: id
        }
    }).valueChanges; 
  }
}
