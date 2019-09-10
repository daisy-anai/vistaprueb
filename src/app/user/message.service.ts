import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Concesion } from '../models/concesion';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private vehiculo: Vehiculo;
  private concesion: Concesion;

  setConcesion(concesion: Concesion){
    this.concesion = concesion;
  }

  setVehiculo(vehiculo: Vehiculo){
    this.vehiculo = vehiculo;
  }

  getElements():any {
    return {
      concesion: this.concesion,
      vehiculo: this.vehiculo
    }
  }
}
