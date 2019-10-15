import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// Variables
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  constructor(private apollo: Apollo){}

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
}
