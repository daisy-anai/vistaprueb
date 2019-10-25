import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
let VehiculoService = class VehiculoService {
    constructor(apollo) {
        this.apollo = apollo;
    }
    getVehiculo(concesionID, filtro) {
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
          }
        }
      `,
            variables: {
                concesion: concesionID,
                serie: filtro
            }
        }).valueChanges;
    }
};
VehiculoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], VehiculoService);
export { VehiculoService };
