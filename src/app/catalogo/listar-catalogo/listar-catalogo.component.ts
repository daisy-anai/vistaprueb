import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import {MenuItem} from 'primeng/api';
// Servicios
import { CatalogoService } from '../catalogo.service';
import { VigenciasService } from '../../vigencias/vigencias.service'
import { Catalogues } from 'src/app/shared/models/catalogues';

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent implements OnInit {
  private modalidadID: string; 
  private options: Array<{}>;  
  public catalogos: Array<Catalogues>;
  public filtro: String;

  constructor (
    private service?: CatalogoService,
    private vigenciasService ?: VigenciasService,
    private route?: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.modalidadID = this.route.snapshot.paramMap.get("id"); 

    this.options = [
      {icon: 'add', description: 'Generar catálogo', urn: `/aplicacion/catalogo/crear/${this.modalidadID}`},
      {icon: 'list', description: 'Vigencia', urn: `/aplicacion/vigencias/modalidad/${this.modalidadID}`}
    ]; 
    this.service.getCataloguesAll().subscribe(({ data })=>{
      this.catalogos = data['cataloguesAll'];
      for (const catalogo of this.catalogos) {
        if(catalogo.deprecated= false){
          console.log("----");
        } 
      }
    });

    // if(this.route.snapshot.paramMap.get("id")){
    //   this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
    //     this.catalogos = data['catalogueByModalidad'];
    //   });

    // }else{  
    //   this.service.getCatalogues().subscribe(({ data })=>{
    //     this.catalogos = data['catalogues'];
    //   });
    // }
  }

  searchCatalgue(event):void{
    if (!this.filtro) {      
      this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
        this.catalogos = data['catalogueByModalidad'];
      });
    }else{
      this.service.searchWord(2, this.filtro.trim()).subscribe(({ data })=>{
        this.catalogos  = data['cataloguesLike'];
      });
    }
  }

  activeCatalogues():void{
    this.service.getCatalogues().subscribe(({ data })=>{
      this.catalogos = data['catalogues'];
    });
  }

  allCatalogues():void{
    this.service.getCataloguesAll().subscribe(({ data })=>{
      this.catalogos = data['cataloguesAll']; 
    }); 
  }
}
