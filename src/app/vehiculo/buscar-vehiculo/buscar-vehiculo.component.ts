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
  public filtro: String = 'KMHAG51G44U340853';
  public vehiculo: any;
  public concesion:Concesion;

  constructor(
    private service?: VehiculoService,
    private shared?: MediumDataService,
    private router?: Router
  ) { }

  ngOnInit() {
    this.concesion = this.shared.getConcesion();
    if(!this.concesion){
      // this.router.navigate(['/aplicacion/concesion/busqueda']);
    }
  }

  onKeyDown($event: any){
    this.buscar();
  }

  buscar(): void {
    this.loading = true;
    this.service.getVehiculo(this.concesion.id, this.filtro).subscribe(result => {
      this.vehiculo = result.data['vehiculoActivo'];
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  permitido(vehiculo: Vehiculo): Boolean {
    let errores: Array<String> = [];
    let status: Boolean = true;

    if(vehiculo.estatus != 'A'){
      errores.push('Vehiculo bloqueado');
      status = false;
    }

    return status;
  }

  redirect(vehiculo: Vehiculo): void {
    if(this.permitido(vehiculo)){
      this.out.emit(vehiculo);
      this.shared.setVehiculo(vehiculo);
      // this.router.navigate([''])
    }
  }
}
