import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private apollo?: Apollo)
  {}
  updatePassword(i: Number, passwd:string){
    return this.apollo.use('servicios').mutate({
      mutation: gql`
      mutation updUsuario_password($i:ID,$passwd:String){
        modificarPassword(id:$i,password:$passwd){
          estatus
          }
        }`,
        variables:{
          i: i,
          passwd:passwd
        }
    })
  }
}
