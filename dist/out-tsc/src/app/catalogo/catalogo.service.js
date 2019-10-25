import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
let CatalogoService = class CatalogoService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    /**
     @description Catalogue Type
     @param getCatalogueType
     */
    getCatalogoType() {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
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
    getModalidad(id) {
        return this.apollo.use('sicac').watchQuery({
            query: gql `
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
    // Active catalogues
    getCatalogues() {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
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
    //All existing catalogues  
    getCataloguesAll() {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
      query cataloguesAll{
        cataloguesAll{
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
          created_at deprecated
        }
      }`
        }).valueChanges;
    }
    //All modalities
    getModalidades() {
        return this.apollo.use('sicac').watchQuery({
            query: gql `
      query modalidades {
        modalidades {
          id
          nombre
        }
      }`
        }).valueChanges;
    }
    //Catalogues for modality
    catalogueByModality(id_modalidad) {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
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
            variables: {
                id_modalidad: id_modalidad
            }
        }).valueChanges;
    }
    //Catalogue for ID
    catalogueByID(id) {
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
            variables: {
                id: id
            }
        }).valueChanges;
    }
    //Search catalogues
    searchWord(limit, word) {
        return this.apollo.use('backrevista').watchQuery({
            query: gql `
      query calogueWord($limit:Int,$word:String!){
        cataloguesLike(limit:$limit, word:$word){
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
          created_at deprecated
        }
      }`,
            variables: {
                limit: limit,
                word: word
            }
        }).valueChanges;
    }
    /**
     @description Mutations
    */
    createdCatalogue(id_modalidad, id_catalogue, name, configuration) {
        return this.apollo.use('backrevista').mutate({
            mutation: gql `
      mutation created($id_modalidad :ID!,$id_catalogue_type:ID!,$name:String!,$configuration:JSON!){
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
            variables: {
                id_modalidad: id_modalidad,
                id_catalogue: id_catalogue,
                name: name,
                configuration: configuration
            }
        });
    }
    catalogueUpdate(id_modalidad, id_catalogue, name, configuration) {
        return this.apollo.use('backrevista').mutate({
            mutation: gql `
      mutation catalogueUpdate($id_modalidad :ID!,$id_catalogue_type:ID!,$name:String!,$configuration:JSON!){
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
            variables: {
                id_modalidad: id_modalidad,
                id_catalogue: id_catalogue,
                name: name,
                configuration: configuration
            }
        });
    }
    catalogueDeprecate(id, reason) {
        return this.apollo.use('backrevista').mutate({
            mutation: gql `
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
            variables: {
                id: id,
                reason: reason
            }
        });
    }
    propertyType(name) {
        return this.apollo.use('backrevista').mutate({
            mutation: gql `
      mutation propertyType($name: String!){
        propertyType(name:$name){
          id
          name
          created_at
          deprecated
        }
      }`,
            variables: {
                name: name
            }
        });
    }
};
CatalogoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CatalogoService);
export { CatalogoService };
