import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
//Service
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Catalogues } from '../../shared/models/catalogues';
 
@Component({
  selector: 'app-seleccion-catalogo',
  templateUrl: './seleccion-catalogo.component.html',
  styleUrls: ['./seleccion-catalogo.component.css']
})
export class SeleccionCatalogoComponent implements OnInit {
  private modalidadID: string;
  private catalogues: Array<Catalogues>;
  public filtro: string;

  constructor(
    private route?: ActivatedRoute,
    private service?: CatalogoService,
   
    ) 
  {}

  ngOnInit() {
    this.modalidadID = this.route.snapshot.paramMap.get("id");
    this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
      this.catalogues = data['catalogueByModalidad'];      
    });
  }

  searchCatalogue(){
    if (!this.filtro) {
      this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
        this.catalogues = data['catalogueByModalidad'];
      }); 
    }else{
      this.service.searchWord(1,this.filtro.trim().toLowerCase()).subscribe(({data})=>{
        this.catalogues = data['cataloguesLike'];
      });
    }
  }

}
