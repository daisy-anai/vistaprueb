import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ConcesionService } from '../concesion.service';
import { Concesion } from '../../shared/models/concesion';

@Component({
  selector: 'buscar-concesion',
  templateUrl: './buscar-concesion.component.html',
  styleUrls: ['./buscar-concesion.component.css']
})
export class BuscarConcesionComponent implements OnInit {
  @Output() out = new EventEmitter<Concesion>();
  public loading: boolean = false;
  public tipo: number = 1;
  public filtro: string;
  public concesiones: Observable<any>;

  constructor(
    private service?: ConcesionService
  ) { }

  ngOnInit() {
  }

  buscar(event): void{
    if(!this.filtro){
      this.concesiones = null;
    }else{
      this.loading = true;
      this.service.getConcesiones(this.filtro, this.tipo, 2).subscribe(result => {
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

    if(!concesion.condiciones.vigente){
      errores.push("Concesión vencida");
      status = false;
    }
    if(!concesion.modalidad.estatus){
      errores.push("Modalidad invalida");
      status = false;
    }

    return status;
  }

  redirect(concesion: Concesion): void {
    if(this.permitido(concesion)){
      this.out.emit(concesion);
    }
  }
}
