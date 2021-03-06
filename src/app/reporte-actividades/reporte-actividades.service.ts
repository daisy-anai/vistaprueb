import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular'
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ReporteActividadesService {

  constructor(private apollo?: Apollo) {}

  historyByCompleteChecksWhereCentroTrabajo(id_centro_trabajo: Number){
    return this.apollo.use('backrevista').watchQuery({
      query: gql`
      query historyByCompleteChecksWhereCentroTrabajo($id_centro_trabajo:ID!){
        historyByCompleteChecksWhereCentroTrabajo(id_centro_trabajo:$id_centro_trabajo){
          id
          id_concesion
          id_vehiculo
            catalogue{
            id
            id_modalidad
            catalogueType{
              id
              name
              description
              created_at
              deprecated
            }
          } 
          review
          is_correct
          description
          created_at
          editable
          tid
        }
      }
      `,variables:{
        id_centro_trabajo:id_centro_trabajo
      }
    }).valueChanges;
  }
  historyByIncompleteChecksWhereCentroTrabajo(id_centro_trabajo: Number){
    return  this.apollo.use('backrevista').watchQuery({
      query: gql`
      query historyByIncompleteChecksWhereCentroTrabajo($id_centro_trabajo:ID!){
        historyByIncompleteChecksWhereCentroTrabajo(id_centro_trabajo:$id_centro_trabajo){
          id
          id_concesion
          id_vehiculo
            catalogue{
            id
            id_modalidad
            catalogueType{
              id
              name
              description
              created_at
              deprecated
            }
          } 
          review
          is_correct
          description
          created_at
          editable
          tid
        }
      }
      `,variables:{
        id_centro_trabajo: id_centro_trabajo
      }
    }).valueChanges;
  }

  historial(){
   return  this.apollo.use('backrevista').watchQuery({
      query: gql`
      query historial{
        histories{
          id
          id_concesion
          catalogue{
            id
            catalogueType{
              name
            }
            name
          }
          is_correct
          review
           editable
          tid
          created_at
        }
      }`
    }).valueChanges;
  }
  
  historyByBetweenDates(from_date: string,to_date: string){
    return  this.apollo.use('backrevista').watchQuery({
      query: gql`
      query historyByBetweenDates($from_date:Date!,$to_date:Date!){
        historyByBetweenDates(from_date:$from_date,to_date:$to_date){
          id
          id_concesion
          id_vehiculo
          catalogue{
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
          review
          is_correct
          description
          created_at
          deprecated
          editable
          tid
        }
      }`,
      variables:{
        from_date: from_date,
        to_date: to_date
      }
    }).valueChanges;
  }
}
