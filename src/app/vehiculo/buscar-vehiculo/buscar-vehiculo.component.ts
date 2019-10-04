import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// services
import { VehiculoService } from '../vehiculo.service';
import { MediumDataService } from '../../shared/services/medium.data.service';

import { Concesion } from '../../shared/models/concesion';
import { Vehiculo } from '../../shared/models/vehiculo';

@Component({
  selector: 'buscar-vehiculo',
  templateUrl: './buscar-vehiculo.component.html',
  styleUrls: ['./buscar-vehiculo.component.css']
})
export class BuscarVehiculoComponent implements OnInit {
  @Input() in: Concesion;
  @Output() out = new EventEmitter<Vehiculo>();

  public loading: Boolean = false;
  public filtro: String;
  public vehiculo: any;
  public concesion: Concesion; 

  constructor(
    private router?:Router,
    private service?: VehiculoService,
    private shared?: MediumDataService
  ) { }

  ngOnInit() {
    this.concesion = this.shared.getConcesion(); 
    if(!this.concesion){
      this.router.navigate(['/aplicacion/concesion/busqueda']); 
    }
  }

  buscar(): void {
    let concesion: Concesion = this.shared.getConcesion(); 
    this.loading = true;
    this.service.getVehiculo(concesion.id, this.filtro).subscribe(result => {
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
