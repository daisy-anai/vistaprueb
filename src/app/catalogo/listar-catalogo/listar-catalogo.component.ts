import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Servicios
import { CatalogoService } from '../catalogo.service';
import { VigenciasService } from '../../vigencias/vigencias.service'
import { Catalogues } from '../../shared/models/catalogues';
import { Modalidad } from '../../shared/models/modalidad'

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
  public modalidades: Array<Modalidad>;
  public localidades: Array<any>;
  constructor (
    private service?: CatalogoService,
    private vigenciasService ?: VigenciasService,
    private route?: ActivatedRoute,
  ) {}

  ngOnInit() {
    $(document).ready(function(){
      $('.tooltipped').tooltip();
    }); 
    this.modalidadID = this.route.snapshot.paramMap.get("id");

    this.options = [
      {icon: 'add', description: 'Crear catalogos ', urn: `/aplicacion/catalogo/crear/${this.modalidadID}`},
      {icon: 'list', description: 'Vigencia', urn: `/aplicacion/vigencias/modalidad/${this.modalidadID}`}

    ];

    if(this.modalidadID){
      this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
        this.catalogos = data['catalogueByModalidad'];
      });
     
    }else{
      this.service.getCatalogues().subscribe(({ data })=>{
        this.catalogos = data['catalogues'];
        
      });
    }
  }

  searchCatalogue(event):void{
    if (!this.filtro) {
      this.activeCatalogues();
    }else{
      this.service.searchWord(1,this.filtro.trim().toLowerCase()).subscribe(({data})=>{
        this.catalogos = data['cataloguesLike'];
      });
    }
  }

  activeCatalogues():void{
    if(this.modalidadID){
      this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
        this.catalogos = data['catalogueByModalidad'];
        console.log(this.catalogos);
        
      });
    }else{
      this.getCatalogues();
    }
  }

  getCatalogues(){
    this.service.getCatalogues().subscribe(({ data })=>{
      this.catalogos = data['catalogues'];
    });
  }

  allCatalogues():void{
    console.log("all");
    this.service.getCataloguesAll().subscribe(({ data })=>{
      this.catalogos = data['cataloguesAll'];
    }); 
  }
}
