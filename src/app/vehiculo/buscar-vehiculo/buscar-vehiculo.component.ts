import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// services
import { VehiculoService } from '../vehiculo.service';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { VigenciasService } from '../../vigencias/vigencias.service';

//models
import { Concesion } from '../../shared/models/concesion';
import { Vehiculo } from '../../shared/models/vehiculo';
import { Vigencia } from '../../shared/models/vigencia';

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
  public  anio = new Date();
  public ModalInstance: any;
  public ModalInstanceVigencia: any;
  public vigencia: Vigencia;

  constructor(
    private service?: VehiculoService,
    private shared?: MediumDataService,
    private router?: Router,
    private vigenciasService?: VigenciasService
  ) { }

  ngOnInit() {
    
    this.concesion = this.shared.getConcesion();  
    console.log(this.concesion);
    this.vehiculo = this.shared.getVehiculo()   ;
    
    
    if(!this.concesion){
      this.router.navigate(['/aplicacion/concesion/busqueda']);
    }
 
    var modal = document.getElementById('validVehiculo');
		this.ModalInstance = M.Modal.init(modal, {
      dismissible:false
    });

    var modalvigencia = document.getElementById('sinVigencia');
		this.ModalInstanceVigencia = M.Modal.init(modalvigencia, {
      dismissible:false
    });

  }
  preview(){
    this.ModalInstance.open();
  }
  onKeyDown($event: any){
    this.buscar();

  }

  buscar(): void {
    this.loading = true;
    this.service.getVehiculo(this.concesion.id, this.filtro).subscribe(result => {
      this.vehiculo = result.data['vehiculoActivo'];
      this.vigenciasService.getVigenciasModalidadByID(this.concesion.modalidad.id).subscribe(({ data })=>{
        [this.vigencia ] = data['validityByModalidad'];  
        let prorrogaDisponible= this.vehiculo.anioModelo + this.vigencia.legal_years + this.vigencia.extension_years - new Date().getFullYear();
        if(prorrogaDisponible == 0){
          this.ModalInstance.open();
        } 
      });
    
      this.loading = false;
    },(error) => {
      var errores = error.message.split(":");
      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[1]+'</div></span>';
      M.toast({html: toastHTML});
      this.loading=false;  
    });

  }

  catalogueSelect(){
  //elegir el catalogo
  var modalidadID = this.concesion.modalidad.id;
   this.router.navigate([`aplicacion/verificacion/plantilla/${modalidadID}`]);
  }

  returnStart(){
    this.ModalInstance.close();
    this.router.navigate(['/aplicacion/inicio']);
  }
  returnStart2(){
    this.ModalInstance.close();
    this.router.navigate(['/aplicacion/inicio']);
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
       //this.router.navigate(['/aplicacion/inicio'])
    }
  }

  goToSearchConcesion() {
    this.router.navigate(['/aplicacion/inicio']); 
    
  }


}
