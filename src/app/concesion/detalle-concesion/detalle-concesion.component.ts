import { Component, OnInit, Input } from '@angular/core';

import { Concesion } from '../../shared/models/concesion';

@Component({
  selector: 'detalle-concesion',
  templateUrl: './detalle-concesion.component.html',
  styleUrls: ['./detalle-concesion.component.css']
})
export class DetalleConcesionComponent implements OnInit {
  @Input() concesion: Concesion;

  constructor() { }

  ngOnInit() {
  }

}
