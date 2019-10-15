import { Component, OnInit } from '@angular/core';

// Models
import { Modalidad } from '../../shared/models/modalidad';

// Services
import { ModalidadService } from '../modalidad.service';

@Component({
  selector: 'app-listar-modalidad',
  templateUrl: './listar-modalidad.component.html',
  styleUrls: ['./listar-modalidad.component.css']
})
export class ListarModalidadComponent implements OnInit {
  public filtro: string;
  public modalidades: Array<Modalidad>

  constructor(private service?: ModalidadService) { }

  ngOnInit() {
    this.service.getModalidades().subscribe(({data}) => {
      this.modalidades = data['modalidades']
    });
  }

}
