import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from "@angular/router";

//Service
import { CatalogoService } from '../../catalogo/catalogo.service';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { StorageService } from "../../shared/services/storage.service";


//MODULES
import { CatalogueType } from '../../shared/models/catalogueType'
import { Catalogues } from '../../shared/models/catalogues';



@Component({
  selector: 'app-seleccion-fisico-mecanica',
  templateUrl: './seleccion-fisico-mecanica.component.html',
  styleUrls: ['./seleccion-fisico-mecanica.component.css']
})
export class SeleccionFisicoMecanicaComponent implements OnInit {

  private modalidadID: string;
  private catalogues: Array<Catalogues>;
  public filtro: string;
  public concesion: any;
  public vehiculo: any;
  public cataloguesTypes: Array<CatalogueType>;

  constructor(
    private route?: ActivatedRoute,
    private service?: CatalogoService,
    private shared?: MediumDataService,
    public storageService?: StorageService,
    private router?: Router
    ){}

  ngOnInit() {
    this.modalidadID = this.route.snapshot.paramMap.get("id");
    this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    
    this.modalidadID = this.route.snapshot.paramMap.get("id");
    this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
      this.catalogues = data['catalogueByModalidad'].filter(e => e.catalogueType.name === 'fisíco mecánica');            
    });
  }

  searchCatalogue(){
    if (!this.filtro) {
      this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
        this.catalogues = data['catalogueByModalidad'].filter(e => e.catalogueType.name === 'fisíco mecánica'); 
      }); 
    }else{
      this.service.searchWord(1,this.filtro.trim().toLowerCase()).subscribe(({data})=>{
        this.catalogues = data['cataloguesLike'];

      });
    }
  }

  redirect(){
    this.router.navigate(['/aplicacion/verificacion/fisicoMecanica/'])
  }
}
