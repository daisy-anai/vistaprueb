import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConcesionService {
  public tipo: number = 1;
  public top: number = 1;

  constructor(
    private apollo?: Apollo
  ) {}

  getConcesiones(filtro: string, tipo?: number, top?: number): Observable<any> {
    return this.apollo.use('sicac').watchQuery({
      query: gql`
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
}
