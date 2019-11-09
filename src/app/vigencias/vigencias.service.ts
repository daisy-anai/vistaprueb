import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class VigenciasService {

  constructor(private apollo?: Apollo){

  }

  createVigencia(id_modalidad: String, legal_years: Number, extension_years: Number){

    return this.apollo.use('backrevista').mutate({
      mutation:gql`
      mutation valityVigencia($id_modalidad:ID!,$legal_years:Int!, $extension_years:Int!){
        validity(id_modalidad:$id_modalidad,legal_years:$legal_years,extension_years:$extension_years){
        id
        id_modalidad  
        legal_years
        extension_years
        created_at
        deprecated
        }
      }`,
      variables:{
        id_modalidad: id_modalidad,
        legal_years: legal_years,
        extension_years: extension_years
      }
    });
  }

  getVigencias(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query validities{
        validities{
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
    }).valueChanges;
  }
  
  getVigenciasModalidadByID(id_modalidad: String){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query validities($id_modalidad:ID!){
        validityByModalidad(id_modalidad:$id_modalidad){
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
      variables:{
        id_modalidad: id_modalidad
      }
    }).valueChanges
  }

  vigenciasByID(id: string){
    return this.apollo.use('backrevista').watchQuery({
      query: gql` 
      query validities($id:ID!){
        validity(id:$id){
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
      variables:{
        id: id
      }
    }).valueChanges;
  }
  
  updateVigencias(id: string, id_modalidad: String, legal_years: Number,extension_years:Number){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation validityUpdate($id:ID!,$id_modalidad:ID!,$legal_years:Int!,$extension_years:Int!){
        validityUpdate(id:$id,id_modalidad:$id_modalidad,legal_years:$legal_years,extension_years:$extension_years){
          id
          id_modalidad
          legal_years
          extension_years
          created_at
          deprecated
        }
      }`,
      variables:{
        id: id,
        id_modalidad: id_modalidad,
        legal_years:legal_years,
        extension_years: extension_years
      }
    });
  }

}
