import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  constructor(
    private apollo?: Apollo
  ) {}

  getVehiculo(concesionID: String, filtro: String): Observable<any> {
    return this.apollo.use('sicac').watchQuery({
      query: gql `
        query findVehiculoActivo($concesion:ID,$serie:String){
          vehiculoActivo(concesion:$concesion,serie:$serie){
            id,
            anioModelo,
            motor,
            serie,
            puertas,
            numeroEconomico,
            estatus,
            marca{
              id,
              nombre
            },
            tipo{
              id,
              nombre
            }
            placa{
              id
              matricula
            }
          }
        }
      `,
      variables: {
        concesion: concesionID,
        serie: filtro
      }
    }).valueChanges;
  }

}
