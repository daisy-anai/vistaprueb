import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  constructor(private apollo: Apollo){}

  //lista de todos los municipios 
  getMunicipios(){
    return this.apollo.use('sicac').watchQuery({
      query: gql`
      query municipios  {
        municipios{
          id
          nombre
          distrito{
            id
            nombre
            region{
              id
              nombre
            }
          }
        }
      }`
    }).valueChanges;
  }
//municipio por id de localidad
  getMunicipioID(id: string){
    return this.apollo.use('sicac').watchQuery({
      query: gql`
      query municipio($id:ID){
        municipio(id:$id){
          id
          nombre
          distrito{
            id
            nombre
            region{
              id
              nombre
            }
          }
        }
      }`,variables:{
        id: id
      }
    }).valueChanges;
  }
    //lista las localidades por el id del municipio
  getLocalidades(id: string){
    return this.apollo.use('sicac').watchQuery({
      query: gql`
      query localidades($municipio:ID){
        localidades (municipio:$municipio){
          id
          nombre
          municipio{
            id
            nombre
            distrito{
              id
              nombre
              region{
                id
                nombre
              }
            }
          }
        }
      }`,
      variables:{
        municipio: id
      } 
    }).valueChanges;
  }
  //lista de la localidad con el id de la localidad
   
  getLocalidad(id: string){
    return this.apollo.use('sicac').watchQuery({
      query: gql`
      query localidad($id:ID){
        localidad(id:$id){
          id
          nombre
          municipio{
            id
            nombre
            distrito{
              id
              nombre
              region{
                id
                nombre
              }
            }
          }
        }
      }` ,
      variables:{
        id:id
      }
    }).valueChanges;
  }
   /**
   @description Catalogue Type
   @param getCatalogueType
   */
  getCatalogoType(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query catalogueTypes{
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

// Active catalogues
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
 //All existing catalogues
  getCataloguesAll(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
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
  //Catalogues by modalidad deprecated
  getCatalogueByModaliadDeprecated(id_modalidad: string){
    console.log(id_modalidad);
    
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query cataloguesByModalidadDeprecated($id_modalidad:ID!) {
        catalogueByModalidadDeprecated(id_modalidad:$id_modalidad){
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

  //All modalities
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

  //Catalogues for modality
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

  //Catalogue for IDss
  catalogueByID(id: String){
    return this.apollo.use('backrevista').watchQuery({
      query: gql `
      query catalogueID($id:ID!){
        catalogue(id:$id){
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
      }`,
      variables:{
        id: id
      }
    }).valueChanges;
  }

  //Search catalogues
  searchWord(limit: Number,word: String){
    return  this.apollo.use('backrevista').watchQuery({
      query: gql`
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
      variables:{
        limit:limit,
        word:word
      }
    }).valueChanges;
  }

  /**
   @description Mutations
  */
  createCatalogue(id_modalidad: String, id_localidad: string, id_catalogue_type:string, name:String, configuration: any){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation createCatalogue( $id_modalidad:ID!,$id_localidad:ID!,$id_catalogue_type:ID!,$name:String!,$configuration:JSON!){
        catalogue(id_modalidad:$id_modalidad, id_localidad:$id_localidad,id_catalogue_type:$id_catalogue_type, name:$name, configuration:$configuration){
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
      }
      `,
      variables:{
        id_modalidad: id_modalidad,
        id_localidad: id_localidad,
        id_catalogue_type: id_catalogue_type,
        name: name,
        configuration: { sections: configuration }
      }
    })
  }
  catalogueUpdate(id_modalidad: String,id_catalogue:string, name: String, configuration: any){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
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
      variables:{
        id_modalidad: id_modalidad,
        id_catalogue: id_catalogue,
        name: name,
        configuration: { secctions: configuration }
      }
    })
  }

  catalogueDeprecate(id: string, reason: String){
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

  // Properties
  getPropertyTypes() {
    return  this.apollo.use('backrevista').watchQuery({
      query: gql`
        query {
          propertyTypes {
            id
            name
            created_at
            deprecated
          }
        }
      `
    }).valueChanges;
  }

  propertyType(name: String){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation propertyType($name: String!){
        propertyType(name:$name){
          id
          name
          created_at
          deprecated
        }
      }`,
      variables:{
        name: name
      }
    })
  }
}
