import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { Concesion } from '../../models/concesion';
import { Vehiculo } from '../../models/vehiculo';

@Component({
  selector: 'app-catalogo-operaciones',
  templateUrl: './catalogo-operaciones.component.html',
  styleUrls: ['./catalogo-operaciones.component.css']
})
export class CatalogoOperacionesComponent implements OnInit {
  public concesion: Concesion;
  public vehiculo: Vehiculo;
  public modalidades: Array<String>;

  constructor(private messageService?: MessageService) { }

  ngOnInit() {
    this.concesion = this.messageService.getElements().concesion;
    this.vehiculo = this.messageService.getElements().vehiculo;
    console.log(this.messageService.getElements());
  }

  separarModalidades(){
    switch(this.concesion.modalidad.nombre){
      case "PASAJE Y CARGA": {

        break;
      }

    };
  }

}
