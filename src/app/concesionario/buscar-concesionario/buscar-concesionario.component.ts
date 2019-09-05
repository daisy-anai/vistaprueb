import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-buscar-concesionario',
  templateUrl: './buscar-concesionario.component.html',
  styleUrls: ['./buscar-concesionario.component.css']
})
export class BuscarConcesionarioComponent implements OnInit {
  public loading: boolean = false;
  public tipo: number = 1;
  public filtro: string;
  public concesiones: Observable<any>;

  constructor(private apollo?: Apollo) { }

  ngOnInit() {
  }

  buscar(event){
    if(!this.filtro){
      this.concesiones = [];
      console.log(this.concesiones);
    }else{
      this.loading = true;
      this.apollo.use('sicac').watchQuery({
        query: gql`
        query listConcesiones($entrada: String, $opcion: Int, $top: Int) {
          concesiones(entrada: $entrada, opcion: $opcion, top: $top) {
            id
            unidadesAmparadas
            modalidad {
              id
              nombre
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
          entrada: this.filtro,
          opcion: this.tipo,
          top: 10
        }
      })
      .valueChanges.subscribe(result => {
        this.loading = false;
        this.concesiones = result.data.concesiones;
      });  
    }
  }
}
