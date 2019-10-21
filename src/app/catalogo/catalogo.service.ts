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



}
