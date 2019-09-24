import { Component, OnInit } from '@angular/core';

import { MediumDataService } from '../../shared/services/medium.data.service';

import { User } from "../../shared/models/user";
import { Concesion } from '../../shared/models/concesion';
import { Vehiculo } from '../../shared/models/vehiculo';
@Component({
  selector: 'app-concesion-vehiculo',
  templateUrl: './concesion-vehiculo.component.html',
  styleUrls: ['./concesion-vehiculo.component.css']
})
export class ConcesionVehiculoComponent implements OnInit {
  public concesion: Concesion;
  public vehiculo: Vehiculo;

  constructor(
    private medium?: MediumDataService
  ) { }

  ngOnInit() {
  }

  recibirConcesion($event){
    this.concesion = $event;
    this.medium.setConcesion($event);
    console.log(this.concesion);
  }

  recibirVehiculo($event){
    this.vehiculo = $event;
    this.medium.setVehiculo($event);
    console.log($event);
  }
}
