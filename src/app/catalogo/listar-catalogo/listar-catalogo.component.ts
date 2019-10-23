import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

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
  public filtro: string;
 
  constructor (
    private service?: CatalogoService,
    private vigenciasService ?: VigenciasService,
    private route?: ActivatedRoute,
  ) {}

  ngOnInit() {
    
    this.modalidadID = this.route.snapshot.paramMap.get("id"); 

    this.options = [
      {icon: 'add', description: 'Agregar catálogo', urn: `/aplicacion/catalogo/crear/${this.modalidadID}`},
      {icon: 'list', description: 'Vigencias', urn: `/aplicacion/vigencias/modalidad/${this.modalidadID}`}
    ]; 
 
    if(this.route.snapshot.paramMap.get("id")){
      this.service.catalogueByModality(this.modalidadID).subscribe(({ data })=>{
        this.catalogos = data['catalogueByModalidad'];
    
      });

    }else{  

      this.service.getCatalogues().subscribe(({ data })=>{
          this.catalogos = data['catalogues']; 
          console.log(this.catalogos);
          for (const lista of this.catalogos) {
            if(lista.deprecated  = false){
            console.log("es falso"); 
          
          }
        }   
      });   
    }
  }
}
