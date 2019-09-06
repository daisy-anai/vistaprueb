import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent implements OnInit {
  public loading: boolean = false;
  public filtro: string;
  public concesionID: string;
  public vehiculos: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo?: Apollo
  ) {}

  ngOnInit() {
  }

  buscar(): void {
    if(!this.filtro){
      this.vehiculos = null;
    }else{
      this.loading = true;
      this.concesionID = this.route.snapshot.paramMap.get("id");

      this.apollo.use('sicac').watchQuery({
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
          concesion: this.concesionID,
          serie: this.filtro
        }
      }).valueChanges.subscribe(result => {
        this.puente(result.data);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  puente(result: any):void {
    console.log(result);
    // this.vehiculos = result.concesiones;
  }

}
