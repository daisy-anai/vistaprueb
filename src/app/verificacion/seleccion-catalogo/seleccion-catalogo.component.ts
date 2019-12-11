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
  public historyVehiculo: any;
  public cromaticaExitosa : boolean = false;
  public historyID : string = '';
  public date: string ;

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
    const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULLIO", "AUGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIMEBRE", "DICIEMBRE"];

  
    var modalPreview = document.getElementById('modalPreviewhistory');
    this.ModalInstancePreview= M.Modal.init(modalPreview,{
      dismissible:false
    });
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
        let current_datetime = new Date(this.history.created_at);
        let fecha = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();
          this.date = fecha;
          
        this.previewExistente = true;
      }else{
        let current_datetime = new Date(this.history.created_at);
        let fecha2 = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();        
        this.previewExistente = false;
        this.cromaticaExitosa = true;
        this.date = fecha2;
      }
      this.historyID = this.history.id;
      
    });

    this.verificarcionService.historyByVehiculo(this.vehiculo.id).subscribe(({ data })=>{
      this.historyVehiculo = data['historyByVehiculo'];
      
    });
     
  }

  information(){
  
    this.ModalInstancePreview.open();

  }
  plantillaHistoryCheck(){
    this.router.navigate([`/aplicacion/verificacion/historia/${this.history.id}`])
  }


  continuarPlantilla(){
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
