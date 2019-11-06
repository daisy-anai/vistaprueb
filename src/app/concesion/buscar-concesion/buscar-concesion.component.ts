import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { ConcesionService } from '../concesion.service';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { HostListener } from '@angular/core';

// Interfaces
import { Concesion } from '../../shared/models/concesion';
declare var M: any;

@Component({
  selector: 'buscar-concesion',
  templateUrl: './buscar-concesion.component.html',
  styleUrls: ['./buscar-concesion.component.css']
})
export class BuscarConcesionComponent {
  public concesiones: Array<Concesion>;
  public loading: boolean = false;
  public tipo: number = 1;
  public filtro: string = 'candido gallegos';

  constructor(
    private service?: ConcesionService,
    private shared?: MediumDataService,
    private router?: Router
  ) {}

 //ocultar teclado movil
  onKey(e) {
    if (e.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
  }
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
      this.service.getConcesiones(this.filtro.trim(), this.tipo, 1).subscribe(result => {
        this.concesiones = result.data['concesiones'];
        this.loading = false;
      },(error)=>{
        var toastHTML = '<span><i class="material-icons">error_outline</i>Concesion no encontrada</span>';
        M.toast({html: toastHTML});
      });
    }
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
       status = false;
    }

    if(!concesion.modalidad.estatus){
      errores.push("Modalidad invalida o inactiva");
      status = false;
    }

    if(concesion.nuc.status == "/"){
      errores.push("No cuenta con NUC");
      status=false;
    }

    return status;
  }

  redirect(concesion: Concesion): void {
    if(this.permitido(concesion)){
      this.shared.setConcesion(concesion);
      this.router.navigate(['/aplicacion/vehiculo/busqueda']);
    }
  }
}
