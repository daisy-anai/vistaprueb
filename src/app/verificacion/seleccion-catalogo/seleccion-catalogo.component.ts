import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from "@angular/router";
import { FormGroup , FormBuilder, Validators, Form} from '@angular/forms';

//Service
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Catalogues } from '../../shared/models/catalogues';
import { MediumDataService } from '../../shared/services/medium.data.service';
import { StorageService } from "../../shared/services/storage.service";
import { VerificarcionService }from '../verificacion.service';

declare var M; 

@Component({
  selector: 'app-seleccion-catalogo',
  templateUrl: './seleccion-catalogo.component.html',
  styleUrls: ['./seleccion-catalogo.component.css']
})
export class SeleccionCatalogoComponent implements OnInit {
  public pdfForm : FormGroup;

  private modalidadID: string;
  private catalogues: Array<Catalogues>;
  public filtro: string;
  public concesion: any;
  public vehiculo: any;
  public cataloguesList: boolean =true;
  public cromatica: boolean= false;
  public history: any;
  public disableFisicoMecancia: boolean = true;
  public license: any;
  public numberLicense: string = '';
  public disabledE : boolean = false; 
  public type: string ='texto';
  public ModalInstancePreview: any;
  public previewExistente : boolean = false;
  public historia : any;
  public cromaticaExitosa : boolean = false;
  constructor(
    private route?: ActivatedRoute,
    private service?: CatalogoService,
    private shared?: MediumDataService,
    public storageService?: StorageService,
    private router?: Router,
    private verificarcionService?:VerificarcionService,
    private formBuilder?: FormBuilder

    ){}

  ngOnInit() {
    // var elems = document.querySelectorAll('.datepicker');
    // var instances = M.Datepicker.init(elems, {
    //   format: 'yyyy-mm-dd'
    // });

    this.concesion = this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    //validar que obtenga una serue de vehiculo

    this.modalidadID = this.route.snapshot.paramMap.get("id");
    this.service.catalogueByModalidadID(this.modalidadID).subscribe(({ data })=>{
      this.catalogues = data['catalogueByModalidad'];   

    });
    
    this.verificarcionService.historyUltimateReviewByVehiculo(this.vehiculo.id).subscribe(({ data })=>{
      this.history = data['historyUltimateReviewByVehiculo'];
      if(this.history.is_correct == false && this.history.catalogue.catalogueType.name=='cromática'){
       
        this.previewExistente = true;
      }else{

        this.previewExistente = false;
        this.cromaticaExitosa = true;
      }
 
    });
  

     
  }
  plantillaHistoryCheck(){
    console.log(this.history.id);
    this.router.navigate([`/aplicacion/verificacion/historia/${this.history.id}`])
  }


  continuarPlantilla(){
    console.log(this.history.id);
    this.router.navigate([`/aplicacion/verificacion/historia/${this.history.id}`])
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
     this.router.navigate([`/aplicacion/verificacion/cromatica/seleccion/${this.modalidadID}`])
  }
  fisicoMecanicaCatalogues(){
    this.router.navigate([`/aplicacion/verificacion/fisicoMecanica/seleccion/${this.modalidadID}`])
  }

}
