import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { ConcesionService } from '../concesion.service';
import { MediumDataService } from '../../shared/services/medium.data.service';

// Interfaces
import { Concesion } from '../../shared/models/concesion';
declare var M: any;

@Component({
  selector: 'buscar-concesion',
  templateUrl: './buscar-concesion.component.html',
  styleUrls: ['./buscar-concesion.component.css']
})
export class BuscarConcesionComponent {
  @Output() out = new EventEmitter<Concesion>();
  public concesiones: Array<Concesion>;
  public loading: boolean = false;
  public tipo: number = 1;
  public filtro: string = 'candido gallegos';

  constructor(
    private service?: ConcesionService,
    private shared?: MediumDataService,
    private router?: Router
  ) { }

  cambiarModo(tipo: number): void {
    this.filtro = "";
    this.tipo = tipo;
    this.concesiones = null;
    document.getElementById('filtro').focus();
  }

  buscar(event): void{
    if(!this.filtro){
      this.concesiones = null;
    }else{
      this.loading = true;
      this.service.getConcesiones(this.filtro, this.tipo, 1).subscribe(result => {
        this.puente(result.data);
        this.loading = false;
      });
    }
  }

  puente(result: any):void {
    this.concesiones = result.concesiones;
  }

  permitido(concesion: any): Boolean {
    let errores: Array<String> = [];
    let status: Boolean = true;

    if(concesion.condiciones.bloqueado){
      errores.push("Concesión bloqueada");
  
      status = false;
    }

    if(!concesion.condiciones.vigente){
      errores.push("Concesión vencida");   
      // var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[0]+'</div></span>';
      // M.toast({html: toastHTML});

      status = false;
    }
    if(!concesion.modalidad.estatus){
      errores.push("Modalidad invalida");
      status = false;
    }

    if(concesion.nuc.status == "" ){
      errores.push("Sin Nuc");
      status=false;
    }

    return status;  
    
  }

  redirect(concesion: Concesion): void {
    if(this.permitido(concesion)){
      this.out.emit(concesion);
      this.shared.setConcesion(concesion);
      this.router.navigate(['/aplicacion/vehiculo/busqueda']);
    }
  }
}
