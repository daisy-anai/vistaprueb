import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// services
import { VehiculoService } from '../vehiculo.service';
import { MediumDataService } from '../../shared/services/medium.data.service';

import { Concesion } from '../../shared/models/concesion';
import { Vehiculo } from '../../shared/models/vehiculo';
import { ConcesionModule } from 'src/app/concesion/concesion.module';
import { IfStmt } from '@angular/compiler';
declare var M: any;

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
      this.router.navigate(['/aplicacion/concesion/busqueda']);
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
    },(error) => {
      var errores = error.message.split(":");
      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[1]+'</div></span>';
      M.toast({html: toastHTML});
      this.loading=false;
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

  goToSearchConcesion() {
    this.router.navigate(['/aplicacion/inicio']); 
  }
}
