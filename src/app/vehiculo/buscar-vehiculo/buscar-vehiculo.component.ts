import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { VehiculoService } from '../vehiculo.service';

import { Concesion } from '../../models/concesion';
import { Vehiculo } from '../../models/vehiculo';

@Component({
  selector: 'buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent implements OnInit {
  @Input() concesion: Concesion;
  @Output() out = new EventEmitter<Vehiculo>();

  public loading: Boolean = false;
  public filtro: String;
  public vehiculo: any;

  constructor(private service?: VehiculoService) { }

  ngOnInit() {
  }
  
  buscar(): void {
    this.loading = true;
    this.service.getVehiculo(this.concesion.id, this.filtro).subscribe(result => {
      this.puente(result.data);
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  puente(result: any):void {
    this.vehiculo = result.vehiculoActivo;
    this.redirect();
  }

  permitido(vehiculo: Vehiculo): Boolean {
    if(vehiculo.estatus == 'A')
      return true;
    return false;
  }

  redirect(): void {
    if(this.permitido(this.vehiculo))
      this.out.emit(this.vehiculo);
  }
}
