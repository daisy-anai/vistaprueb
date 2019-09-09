import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApplicationService } from '../application.service';
import { MessageService } from '../message.service';
import { Concesion } from '../../models/concesion';

@Component({
  selector: 'app-buscar-concesionario',
  templateUrl: './buscar-concesionario.component.html',
  styleUrls: ['./buscar-concesionario.component.css']
})
export class BuscarConcesionarioComponent implements OnInit {
  public loading: boolean = false;
  public tipo: number = 1;
  public filtro: string;
  public concesiones: Observable<any>;

  constructor(
    private messageService?: MessageService,
    private service?: ApplicationService,
    private router?: Router
  ) {}

  ngOnInit() {
  }

  buscar(event): void{
    if(!this.filtro){
      this.concesiones = null;
    }else{
      this.loading = true;
      this.service.getConcesiones(this.filtro, this.tipo).subscribe(result => {
        this.puente(result.data);
        this.loading = false;
      });
    }
  }

  puente(result: any):void {
    this.concesiones = result.concesiones;
  }

  permitido(concesion: any): boolean {
    let modalidades: Array<string> = ["TAXI", "PASAJE Y CARGA", "TRANSPORTE URBANO", "MOTOTAXI"];
    if(concesion.condiciones.vigente)
      if(modalidades.includes(concesion.modalidad.nombre))
        return true;
    return false;
  }

  redirect(concesion: Concesion): void {
    if(this.permitido(concesion)){
      this.messageService.setConcesion(concesion);
      this.router.navigate(['/application/concesionario', concesion.id]);
    }
  }
}
