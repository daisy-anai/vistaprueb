import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup , FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private apollo?: Apollo,
    private service?: CatalogoService
  ) { }

  ngOnInit() {
    
    $(document).ready(function(){
      $('.modal').modal();
    });
  
    this.service.getCatalogos().subscribe(result => {
      this.catalogos = result.data['catalogos'];
    }, error => {
      console.log(error);
    });
  }


}
