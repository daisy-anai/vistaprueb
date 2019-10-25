import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
let ConcesionService = class ConcesionService {
    constructor(apollo) {
        this.apollo = apollo;
        this.tipo = 1;
        this.top = 1;
    }
    getConcesiones(filtro, tipo, top) {
        return this.apollo.use('sicac').watchQuery({
            query: gql `
        query getConcesiones($entrada: String, $opcion: Int, $top: Int) {
          concesiones(entrada: $entrada, opcion: $opcion, top: $top) {
            id
            unidadesAmparadas
            modalidad {
              id
              nombre
              estatus
            }
            sitio {
              id
              nombre
            }
            nuc
            estatus
            concesionario {
              tipoPersona
              nombre
              primerApellido
              segundoApellido
              razonSocial
              localidad {
                id
                nombre
                municipio {
                  id
                  nombre
                }
              }
            }
            condiciones{
              vigente
              bloqueado
            }
          }
        }
      `,
            variables: {
                entrada: filtro,
                opcion: tipo || this.tipo,
                top: top || this.top
            }
        }).valueChanges;
    }
};
ConcesionService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ConcesionService);
export { ConcesionService };
