import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class VigenciasService {

  constructor(private apollo?: Apollo){

  }

  createVigencia(id_modalidad: String, anios_legales: Number, anios_prorroga: number){
    console.log(typeof anios_legales);
    console.log(id_modalidad,anios_legales, anios_prorroga );
    
    return this.apollo.use('backrevista').mutate({
      mutation:gql`
      mutation vigencia($id_modalidad:ID!,$anios_legales:Int,$anios_prorroga:Int){
        vigencia(id_modalidad:$id_modalidad,anios_legales:$anios_legales,anios_prorroga:$anios_prorroga){
          id
          anios_legales
          anios_prorroga
        }
      }`,
      variables:{
        id_modalidad: id_modalidad,
        anios_legales: anios_legales,
        anios_prorroga: anios_prorroga
      }
    });
  }

  getVigencias(){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query vigencias{
        vigencias{
          id
          anios_legales
          anios_prorroga
        }
      }`,
    }).valueChanges;
  }
  
  getVigenciasModalidadByID(id_modalidad: String){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query query($id_modalidad: ID!){
        vigenciaByModalidad(id_modalidad:$id_modalidad){
          id
          anios_legales
          anios_prorroga
        }
      }`,
      variables:{
        id_modalidad: id_modalidad
      }
    }).valueChanges
  }

  modificarVigencias(id: Number, id_modalidad: String, anios_legales: Number,anios_prorroga:Number){
    return this.apollo.use('backrevista').mutate({
      mutation: gql`
      mutation modificar($id:ID!,$id_modalidad:ID!,$anios_legales:Int,$anios_prorroga:Int){
        updateVigencia(id:$id,id_modalidad:$id_modalidad,anios_legales:$anios_legales,anios_prorroga:$anios_prorroga){
          id
          anios_legales
          anios_prorroga
          estatus
          createdAt
        }
      }`,
      variables:{
        id: id,
        id_modalidad: id_modalidad,
        anios_legales:anios_legales,
        anios_prorroga: anios_prorroga
      }
    });
  }

  vigenciasByID(id: Number){
    return this.apollo.use('backrevista').watchQuery({
      query: gql` 
      query vigenciaByID($id:ID!){
        vigencia(id:$id){
          id
          anios_legales
          anios_prorroga
          id_modalidad
        }
      }`,
      variables:{
        id: id
      }
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

}
