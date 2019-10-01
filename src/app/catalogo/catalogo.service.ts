import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(private apollo?: Apollo){}

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

  getModalidades(){
    return this.apollo.use('sicac').watchQuery({
      query: gql`
      query modalidades {
        modalidades {
          id
          nombre
        }
      }`
    }).valueChanges;
  }

  getSecciones(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query secciones {
        secciones {
          id
          nombre
        }
      }`
    }).valueChanges;
  }

  getPropiedades(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query propiedades {
        propiedades{
          id
          nombre
        }
      }`
    }).valueChanges;
  }

  getTiposCatalogo() {
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query tiposCatalogo {
        tiposCatalogo {
          id
          nombre
        }
      }`
    }).valueChanges;
  }

  getTipoPropiedad(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query tiposPropiedad {
        tiposPropiedad {
          id
          nombre
        }
      }`
    }).valueChanges;
  }
  //incompleto
  getEditCatalogo(id:Number){
    return this.apollo.use('backrevista').watchQuery({
      query:gql`

      `,
      variables: {
        id: id
      }
    }).valueChanges;

  }

}
