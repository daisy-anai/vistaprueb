import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VigenciasService {
  constructor(private apollo?: Apollo){

  }

  createVigencia(id_modalidad: number, anios_legales: number, anios_prorroga: number){
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
}
