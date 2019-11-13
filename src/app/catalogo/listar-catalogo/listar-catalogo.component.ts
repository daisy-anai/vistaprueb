import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
// import {SwPush} from '@angular/service-worker';

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
  public activos: Array<Catalogues>;
  public catalogue: any;
  // public catalogos: any;
  public onlyActive: Boolean = false;

  public filtro: string;
  public modalidades: Array<Modalidad>;
  public localidades: Array<any>;
  constructor (
    private service?: CatalogoService,
    private vigenciasService ?: VigenciasService,
    private route?: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.modalidadID = this.route.snapshot.paramMap.get("id");
 
    this.options = [
      {icon: 'add', description: 'Crear catalogos ', urn: `/aplicacion/catalogo/crear/${this.modalidadID}`},
      {icon: 'list', description: 'Vigencia', urn: `/aplicacion/vigencias/modalidad/${this.modalidadID}`}
    ];

    if(this.modalidadID){    
      this.activeCatalogues();
    }else{
      this.getCatalogues();
    }
  }

  searchCatalogue(){
    if (!this.filtro) {
     this.activeCatalogues();    
    }else{
      this.service.searchWord(1,this.filtro.trim().toLowerCase()).subscribe(({data})=>{
        this.catalogos = data['cataloguesLike'];
        console.log(this.catalogos);  
      });
    }
  }

  activeCatalogues(){
    this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
      this.catalogos = data['catalogueByModalidad'];
    });

  }

  getCatalogues(){
    this.service.getCatalogues().subscribe(({ data })=>{
      this.catalogos = data['catalogues'];
    });
  }

  allCatalogues(){
    if(this.modalidadID){
      this.service.getCatalogueByModaliadDeprecated(this.modalidadID).subscribe(({data})=>{
        this.catalogos = data['catalogueByModalidadDeprecated'];
      }); 
    }else{
      this.service.getCataloguesAll().subscribe(({ data })=>{
        this.catalogos = data['cataloguesAll'];
      });
    }
  }

  example1(){
    
    var doc= document.getElementsByName('group');
    if ($('input[name=group1]:checked').length > 0) {
      // do something here
      console.log("checado");      
    }
  }
example(){
  $("input[type='group']").click(function() {
    var previousValue = $(this).attr('previousValue');
    var name = $(this).attr('name');

  });
}
 
}
