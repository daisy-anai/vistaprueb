import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Validators, FormGroup , FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {Observable} from 'rxjs';

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
  // recibe pasarle datos
  @Output() outCatalogo= new EventEmitter<DatosCatalogo>();

  public catalogos: Array<any>;
  //variables de busqueda
  public buscador: boolean = false;
  public modelBuscar : String;
  public datos : number;
  public datosCatalogos : Observable<any>;

  constructor(
    private apollo?: Apollo,
    private service?: CatalogoService
  ) { }

  ngOnInit() {
    this.service.getCatalogos().subscribe(result => {
      this.catalogos = result.data['catalogos'];
    }, error => {
      console.log(error);
    });
  }
  //buscar catalogos
  buscarCatalogo(){

  }
}
