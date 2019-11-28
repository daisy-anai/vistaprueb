import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

//Service
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Catalogues } from '../../shared/models/catalogues';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { StorageService } from "../../shared/services/storage.service";


@Component({
  selector: 'app-seleccion-catalogo',
  templateUrl: './seleccion-catalogo.component.html',
  styleUrls: ['./seleccion-catalogo.component.css']
})
export class SeleccionCatalogoComponent implements OnInit {

  private modalidadID: string;
  private catalogues: Array<Catalogues>;
  public filtro: string;
  public concesion: any;
  public vehiculo: any;
  public cataloguesList: boolean =true;
  public cromatica: boolean= false;
  
  constructor(
    private route?: ActivatedRoute,
    private service?: CatalogoService,
    private shared?: MediumDataService,
    public storageService?: StorageService,
    ){}

  ngOnInit() {
    this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    //validar que obtenga una serue de vehiculo
   
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
  cromaticaCatalogues(){
    console.log("cromatica");
    this.cataloguesList= false;
    this.cromatica= true;
  }
  fisicoMecanicaCatalogues(){
    console.log("fisico-Mecanica");
    
  }

}
