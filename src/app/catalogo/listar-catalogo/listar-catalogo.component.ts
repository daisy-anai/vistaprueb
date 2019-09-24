import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup , FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';


// Servicios
import { CatalogoService } from '../catalogo.service'; 

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
    this.service.getCatalogos().subscribe(result => {
      this.catalogos = result.data['catalogos']; 
      console.log(this.catalogos);
    }, error => {
      console.log(error);
    });
  }



}
