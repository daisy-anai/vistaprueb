import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(private apollo: Apollo){}

  getCatalogos(): Observable<any> {
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

//modalidad del catalogo
  getCatalogosByModalidad(id:string){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query($id_modalidad:ID!){
        catalogos(id_modalidad:$id_modalidad){
          id
          nombre
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
          }
        }
      }`,
      variables: {
        id_modalidad: id
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

  getModalidad(id: String){
    return this.apollo.use('sicac').watchQuery({
      query: gql`
      query modalidad($id:ID) {
        modalidad(id:$id) {
          id
          nombre
        }
      }`,
      variables: {
        id: id
      }
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

  deleteCatalogo(id: Number) {
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation eliminarCatalogo($id:ID!){
        downCatalogo(id: $id)
      }`,
      variables: {
        id: id
      }
    });
  }

  createCatalogo(id_modalidad :String, id_tipo_catalogo: String, nombre: string,seccion: any){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation crear($id_modalidad:ID!, $id_tipo_catalogo:ID!, $nombre:String!, $secciones:[SeccionesInput!]!){
        catalogo (id_modalidad:$id_modalidad,id_tipo_catalogo:$id_tipo_catalogo, nombre:$nombre,secciones:$secciones){
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
      }`,
      variables:{
      id_modalidad: id_modalidad,
      id_tipo_catalogo: id_tipo_catalogo,
      nombre: nombre,
      secciones: seccion
      }
    });
  }

}
