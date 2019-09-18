
import { Injectable } from '@angular/core';
import  gql from 'graphql-tag';
import { Apollo} from 'apollo-angular';


@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  constructor(private apollo?:Apollo) { }
 generarPlantilla(id: String, nombre:string, plantilla: ArrayBuffer){
  return this.apollo.use('backrevista').watchQuery({
    query:gql
    `query  mutation catalogo($id: String!, $nombre:String!, $plantilla:[SeccionesInput]!) {
      catalogo(id_modalidad:$id, nombre:$nombre, plantilla:$plantilla){
        id
        nombre
        estatus
        createdAt
        modalidad {
          id
          descripcion
          estatus
          abreviatura
        }
        seccion {
          id
          nombre
          propiedad {
            id
            nombre
            tipo {
              id
              nombre
              medio
            }
          }
        }
      }
    }`,
    variables:{
      id: id,
      nombre: nombre,
      plantilla:{
        id:id,
        nombre:nombre,
        plantilla:plantilla,
      }
    }
  }).valueChanges;
 }
  
}
