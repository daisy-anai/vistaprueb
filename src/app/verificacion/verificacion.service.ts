import { Injectable, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class VerificarcionService {

  constructor(private apollo: Apollo) {}

  licenseByNumber(numero : string){
    return this.apollo.use('backLicencias').watchQuery({
      query: gql `
      query licenseByNumbe($numero:String!){
        licenseByNumber(numero:$numero){
          id
          contribuyente{
            nombre
            primer_apellido
            segundo_apellido
             curp
            ubicacion{
              calle
              numero_exterior
              numero_interior
              numero_interior
              codigo_postal
              asentamiento
              municipio
              estado
            }	
          }
         tipo
          vigencia
          fecha_captura
          fecha_impresion
          fecha_vencimiento
          fecha_antiguedad
          
        }
      }
      `, variables:{
        numero: numero
      }
    }).valueChanges;
  }

  historyByCompleteChecksWhereCentroTrabajo(id_centro_trabajo: number){
    return this.apollo.use('backrevista').watchQuery({
      query: gql `
      query  historyByCompleteChecksWhereCentroTrabajo($id_centro_trabajo:ID!){
        historyByCompleteChecksWhereCentroTrabajo(id_centro_trabajo:$id_centro_trabajo){
          id
          id_concesion
          id_vehiculo
          catalogue{
            id
            id_modalidad
            catalogueType{
              id
              name
              description
              created_at
              deprecated
            }
          }         
          review
          is_correct
          description
          created_at
          deprecated
          editable
          tid
        }
      }
      `, variables:{
        id_centro_trabajo: id_centro_trabajo
      }
    }).valueChanges;
  }

  historyByIncompleteChecksWhereCentroTrabajo(id_centro_trabajo: number){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query historyByIncompleteChecksWhereCentroTrabajo($id_centro_trabajo:ID!){
        historyByIncompleteChecksWhereCentroTrabajo(id_centro_trabajo:$id_centro_trabajo){
          id
          id_concesion
          id_vehiculo
          catalogue{
            id
            id_modalidad
            catalogueType{
              id
              name
              description
              created_at
              deprecated
            }
          }   
          review
          is_correct
          description
          created_at
          deprecated
          editable
          tid
        }
      }`, variables:{
        id_centro_trabajo: id_centro_trabajo
      }
    }).valueChanges;
  }
  
  historyUltimateReviewByVehiculo(id_vehiculo: string){
    return this.apollo.use('backrevista').watchQuery({
      query : gql`
      query historyUltimateReviewByVehiculo($id_vehiculo:ID!){
        historyUltimateReviewByVehiculo(id_vehiculo:$id_vehiculo){
        id
          id_concesion
          id_vehiculo
          catalogue{
            id
            id_modalidad
            catalogueType{
              id
              name
              description
              created_at
              deprecated
            }
          }   
          review
          is_correct
          description
          created_at
          deprecated
          editable
          tid
        }
      }`, variables:{
        id_vehiculo: id_vehiculo
      }
    }).valueChanges;
  }

  historybyID(id: string){
    return this.apollo.use('backrevista').watchQuery({
      query:gql`
      query historyByID($id:ID!){
        history(id:$id){
          id
          id_concesion
          id_vehiculo
          catalogue{
            id
            id_modalidad
            catalogueType{
              id
              name
              description
              created_at
              deprecated
            }
            name
            deprecated
            created_at
          }
          review
          is_correct
          description
          created_at
          deprecated
          editable
          tid
        }
      }`,
      variables:{
        id:id
      }
    }).valueChanges;
  }


  //mutations


  createHistory(id_concesion:String,id_vehiculo:string,id_catalogue:string,review:any,is_correct:boolean,description:string){

    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation history($id_concesion:ID!,$id_vehiculo:ID!,$id_catalogue:ID!,$review:JSON!,$is_correct:Boolean!,$description:String!){
          history(id_concesion:$id_concesion,id_vehiculo:$id_vehiculo,id_catalogue:$id_catalogue,review:$review,is_correct:$is_correct,description:$description){
            id
            id_concesion
            id_vehiculo
            catalogue{
              id
              id_modalidad
              id_localidad
              catalogueType{
                id
                name
                description
                created_at
                deprecated
              }
            name
            configuration
            created_at
            deprecated
            }
            review
            is_correct
             description
            created_at
            deprecated
            editable
            tid
            
          }
        }`,
        variables:{
          id_concesion:id_concesion,
          id_vehiculo: id_vehiculo,
          id_catalogue: id_catalogue,
          is_correct:is_correct,
          description:description,
          review:  review

        }
    })
  }
}
