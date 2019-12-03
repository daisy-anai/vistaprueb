import { Injectable, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class VerificarcionService {

  constructor(private apollo: Apollo) {}
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
