import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { ApplicationService } from "../application.service";
import { MessageService } from '../message.service';
import { Concesion } from '../../models/concesion';
import { Vehiculo } from '../../models/vehiculo';

@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent implements OnInit {
  public loading: Boolean = false;
  public filtro: String;
  public concesion: Concesion;
  public concesionID: String;
  public vehiculo: any;

  constructor(
    private messageService?: MessageService,
    private route?: ActivatedRoute,
    private router?: Router,
    private service?: ApplicationService
  ) {

  }

  ngOnInit() {
  }

  buscar(): void {
    if(!this.filtro){
      this.vehiculo = null;
    }else{
      this.loading = true;
      this.concesionID = this.route.snapshot.paramMap.get("id");
      this.service.getVehiculo(this.concesionID, this.filtro).subscribe(result => {
        this.puente(result.data);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  puente(result: any):void {
    this.vehiculo = result.vehiculoActivo;
  }

  redirect(vehiculo: Vehiculo): void {
    if(true){
      this.messageService.setVehiculo(vehiculo);
      this.router.navigate(['/application/catalogo']);
    }
  }

}
