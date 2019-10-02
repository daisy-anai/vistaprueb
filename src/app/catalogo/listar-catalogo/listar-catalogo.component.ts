import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup , FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';

// Servicios
import { CatalogoService } from '../catalogo.service';
declare var M:any;

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent implements OnInit {
  public catalogos: Array<any>;

  constructor(private apollo: Apollo, private service?: CatalogoService) {}

  ngOnInit() {
    this.service.getCatalogos().subscribe(({data, loading}) => {
      this.catalogos = data['catalogos'];
    });
  }
}
