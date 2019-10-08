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
  
  getVigenciasModalidadByID(id : string){
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
        id_modalidad: id
      }
    }).valueChanges
  }

}
