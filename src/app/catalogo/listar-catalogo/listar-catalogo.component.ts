import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup , FormControl } from '@angular/forms';

//models
import {DatosCatalogo} from '../../shared/models/datosCatalogo';

// Servicios
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent implements OnInit {
  public catalogos: Array<any>;
  public filtro: string;
  constructor (
    private service?: CatalogoService
  ) {}

  ngOnInit() {
    this.service.getCatalogos().subscribe(({data, loading}) => {
      this.catalogos = data['catalogos'];
    });

  }
}
