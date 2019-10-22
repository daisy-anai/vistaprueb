import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(private apollo: Apollo){}

 getCatalogoType(){
   return this.apollo.use('backrevista').watchQuery({
    query: gql`
    query {
      catalogueTypes{
        id
        name
        description
        created_at
        deprecated
      }
    }`,
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

 getCatalogues(){
   return this.apollo.use('backrevista').watchQuery({
    query: gql`
    query catalogues{
      catalogues {
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
        configuration
        created_at
        deprecated
      }
    }`
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
  
  catalogueByModality(id_modalidad: String){
    return this.apollo.use('backrevista').watchQuery({
      query :gql`
      query modalidadByID($id_modalidad:ID!){
        catalogueByModalidad(id_modalidad:$id_modalidad){
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
          configuration
          created_at
          deprecated
        }
      }`,
       variables:{
        id_modalidad: id_modalidad
      }
    }).valueChanges;
  }
  
  //Catalogue ID
  
  catalogueByID(id: Number){
    return this.apollo.use('backrevista').watchQuery({
      query: gql `
      query catalogueID($id:ID!){
        catalogue(id:$id){
          id
          id_modalidad
          catalogueType{
            id
            name
            description
            created_at
            deprecated
          }
          configuration
          created_at   
          deprecated
        } 
      }`,
      variables:{
        id: id
      }
    }).valueChanges;  
  }

  createdCatalogue(id_modalidad: String,id_catalogue:Number, name: String, configuration: String){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation created($id_modalidad :ID!,$id_catalogue_type:ID!,$name:String!,$configuration:String!){
        catalogue(id_modalidad:$id_modalidad,id_catalogue_type:$id_catalogue_type,name:$name,configuration:$configuration){
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
          configuration
          created_at
          deprecated
        }
      }`,
      variables:{
        id_modalidad: id_modalidad,
        id_catalogue: id_catalogue,
        name: name,
        configuration: configuration
      }
    }) 
  }
  catalogueUpdate(id_modalidad: String,id_catalogue:Number, name: String, configuration: String){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation catalogueUpdate($id_modalidad :ID!,$id_catalogue_type:ID!,$name:String!,$configuration:String!){
        catalogueUpdate(id_modalidad:$id_modalidad,id_catalogue_type:$id_catalogue_type,name:$name,configuration:$configuration){
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
          configuration
          created_at
          deprecated
        }
      }`,
      variables:{
        id_modalidad: id_modalidad,
        id_catalogue: id_catalogue,
        name: name,
        configuration: configuration
      }
    })
  }

  catalogueDeprecate(id: Number, reason: String){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation catalogueDeprecate($id:ID!,$reason:String!){
        catalogueDeprecate(id:$id,reason:$reason){
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
          configuration
          created_at
          deprecated
        }
      }`,
      variables:{
        id: id,
        reason: reason
      }
    })
  }
}
