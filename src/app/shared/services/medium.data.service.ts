import {Injectable} from "@angular/core";

// Modelos
import { Concesion } from '../models/concesion';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class MediumDataService {
  private concesion: Concesion;
  private vehiculo: Vehiculo;

  constructor() {

  }

  setConcesion(concesion: Concesion): void {
    this.concesion = concesion;
  }

  getConcesion(): Concesion {
    return this.concesion;
  }

  setVehiculo(vehiculo: Vehiculo): void {
    this.vehiculo = vehiculo;
  }

  getVehiculo(): Vehiculo {
    return this.vehiculo;
  }

  deleteConcesion(): void {
    this.concesion = null; 
  }

}
