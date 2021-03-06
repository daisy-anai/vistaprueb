import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from "@angular/router";

//Service
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Catalogues } from '../../shared/models/catalogues';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { StorageService } from "../../shared/services/storage.service";
import { CatalogueType } from '../../shared/models/catalogueType'

@Component({
  selector: 'app-seleccion-cromatica',
  templateUrl: './seleccion-cromatica.component.html',
  styleUrls: ['./seleccion-cromatica.component.css']
})
export class SeleccionCromaticaComponent implements OnInit {
  private modalidadID: string;
  private catalogues: Array<Catalogues>;
  public cataloguesTypes: Array<CatalogueType>;
  public filtro: string;
  public concesion: any;
  public vehiculo: any;
  public tipo : any;


  constructor(
    private route?: ActivatedRoute,
    private service?: CatalogoService,
    private shared?: MediumDataService,
    public storageService?: StorageService,
    private router?: Router
  ){}

  ngOnInit() {
    this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    //validar que obtenga una serue de vehiculo
   
    
    this.modalidadID = this.route.snapshot.paramMap.get("id");
    this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
      this.catalogues = data['catalogueByModalidad'].filter(e => e.catalogueType.name === "cromática");             
      console.log(this.catalogues);
      
    });

 
  }
  searchCatalogue(){
    if (!this.filtro) {
      this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
        this.catalogues = data['catalogueByModalidad'].filter(e => e.catalogueType.name === "cromática");
      }); 
    }else{
      this.service.searchWord(1,this.filtro.trim().toLowerCase()).subscribe(({data})=>{
        this.catalogues = data['cataloguesLike'].filter(e => e.catalogueType.name === "cromática").filter(deprecado => deprecado.deprecated === false)  ;
      });
    }
  }
}
