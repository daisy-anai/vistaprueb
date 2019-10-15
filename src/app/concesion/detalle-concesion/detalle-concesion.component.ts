import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { MediumDataService } from '../../shared/services/medium.data.service';

// Interfaces
import { Concesion } from '../../shared/models/concesion';

@Component({
  selector: 'detalle-concesion',
  templateUrl: './detalle-concesion.component.html',
  styleUrls: ['./detalle-concesion.component.css']
})
export class DetalleConcesionComponent implements OnInit {
  private concesion: Concesion;

  constructor(
    private shared?: MediumDataService,
    private router?: Router
  ) { }

  ngOnInit() {
    this.concesion = this.shared.getConcesion();
    if(!this.concesion){
      this.router.navigate(['/aplicacion/concesion/busqueda']);
    }
  }

}
