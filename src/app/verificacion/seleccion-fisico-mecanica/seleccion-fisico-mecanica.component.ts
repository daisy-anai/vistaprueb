import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from "@angular/router";

//Service
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Catalogues } from '../../shared/models/catalogues';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { StorageService } from "../../shared/services/storage.service";



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
      this.catalogues = data['catalogueByModalidad'];            
    });
    this.searchFisicoMecanica();
  }

  searchFisicoMecanica(){
  //  let filtro = this.catalogues.filter(palabra=>(palabra.name));
  //  console.log(filtro);
   
  }
  redirect(){
    this.router.navigate(['/aplicacion/verificacion/fisicoMecanica/'])
  }
}