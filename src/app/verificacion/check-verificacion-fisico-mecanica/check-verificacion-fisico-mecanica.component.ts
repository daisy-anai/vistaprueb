import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup , FormBuilder, Validators, Form} from '@angular/forms';

//service
import { MediumDataService } from '../../shared/services/medium.data.service';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Concesion} from '../../shared/models/concesion';
import { Vehiculo} from '../../shared/models/vehiculo';
import {VerificarcionService} from '../verificacion.service';
import { VehiculoService } from '../../vehiculo/vehiculo.service';

declare var M: any;


@Component({
  selector: 'app-check-verificacion-fisico-mecanica',
  templateUrl: './check-verificacion-fisico-mecanica.component.html',
  styleUrls: ['./check-verificacion-fisico-mecanica.component.css']
})
export class CheckVerificacionFisicoMecanicaComponent implements OnInit {
  public pdfForm : FormGroup;
  public catalogueID :string;
  private catalogues: any;
  public type: string = 'texto'; 
  public concesion : Concesion;
  public vehiculo : any;
  public history: any;
  public proipiedacCheck: any;
  public ModalInstancePreview: any;
  public ModalInstanceQuestion: any;
  public is_correct : boolean= false;
  public download : boolean = false;
  public reportComplete : boolean =false;
  public alert: boolean= true;
  public license: any;
  public showComplete: boolean= false;
  public showIncomplete: boolean= false;
  public close : boolean= true;
  public finalizar: boolean= false;
  //datos para el pdf
  public domicilioConcesionario: string = '';
  public domicilioC: string=''
  public coloniaConcesionario: string = '';
  public coloniaC:string = '';
  public numeroAcuerdo: string = '';
  public numeroA: string = '';
  public vencimiento: string = '';
  public vencimientoC: string = '';
  public nLicencia: string = '';
  public numberLicense: string = ''
  public vencimientoVehiculo: string = '';
  public vencimientoV: string = '';
  public numeroPoliza: string = '';
  public numeroPolizaVehiculo: string = '';
  public observacionRevision: string = '';
  public observacion: string = '';
  public datosLicencia: boolean= false;
  public color: string ='';
  public descriptionHistory : string = '';
  public colorVehiculo: string ='';
  public modalidad: string='';
  public idhistory: string= '';

  constructor( 
    private route?: ActivatedRoute,
    private catalogueService?: CatalogoService,
    public shared?: MediumDataService,
    public router?: Router,
    public service?: VerificarcionService,
    public formBuilder?: FormBuilder,
    public vehiculoService?: VehiculoService
    ){}

  ngOnInit() {

    var modalPreview = document.getElementById('modalPreview');
    this.ModalInstancePreview= M.Modal.init(modalPreview,{
      dismissible:false
    });

    this.concesion= this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
 

    if(!this.vehiculo){
      var toastHTML= '<span><div class="valign-wrapper">No se encontro vehículo<i class="material-icons">error_outline</i> </div></span>';
      M.toast({html: toastHTML});
      this.router.navigate(['/aplicacion/concesion/busqueda']);
    }
  
    this.catalogueID= this.route.snapshot.paramMap.get('id');

    this.catalogueService.catalogueByID( this.route.snapshot.paramMap.get("id")).subscribe(({ data })=>{
      this.catalogues = data['catalogue'];    
      for (const secciones of this.catalogues.configuration.sections ) {
        for (const propiedades of secciones.properties) {
          propiedades.checked = false;
        }
      }   
   });    



  }

  checar(propiedad: any ){
    propiedad.checked = !propiedad.checked;  
  } 

  createHistory(){
    var cont = 0;
    this.color= this.colorVehiculo;
    this.domicilioConcesionario= this.domicilioC;

    var checkTamanio =document.getElementsByName('check').length
    for (const secciones of this.catalogues.configuration.sections) {
      for (const propiedades of secciones.properties) {
        if(propiedades.checked==true){
          cont ++
          if(checkTamanio== cont){
            this.is_correct= true;
          }else{
            this.is_correct= false;
          }    
        }
      }
    }
    var id_concesion = this.concesion.id;
    var id_vehiculo = this.vehiculo.id;
    var id_catalogue = this.catalogues.id
    this.service.createHistory(id_concesion,id_vehiculo,id_catalogue,this.catalogues.configuration,this.is_correct,this.descriptionHistory).subscribe(({data})=>{ 
      this.history = data['history'];
      if(this.is_correct == true){
        this.showComplete = true;;
        this.showIncomplete=false;
      }else{  
        this.showIncomplete = true;
        this.showComplete= false;
      }
      this.idhistory= this.history.id;
    });
   
  }
  cancelarPreview(){
   this.descriptionHistory ='';
   this.colorVehiculo='';
  }
  preview(){
    this.ModalInstancePreview.open();
  }
  closeAlert(){
    this.alert= false;
  }
  questionAlert(){
    var acuerdo = document.getElementById('numAcuerdo');
    var acuerdo2 = document.getElementsByClassName('numAcuerdo')
    let e =
    // var pass = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(acuerdo, acuerdo2);
    
    
    var question = document.getElementById('question');
    this.ModalInstanceQuestion = M.Modal.init(question, {
      dismissible:false
    });
    //01113689

    this.service.licenseByNumber(this.numberLicense).subscribe(({ data })=>{
      this.license = data['licenseByNumber'];
        console.log(this.license, "true");  
        this.datosLicencia = true;
        this.ModalInstanceQuestion.open();

    },(error) => {
      var errores = error.message.split(":");
      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[1]+'</div></span>';
      M.toast({html: toastHTML});
    });
  
   
  }
  aceptado(){
    this.domicilioConcesionario= this.domicilioC;
    this.coloniaConcesionario = this.coloniaC;
    this.numeroAcuerdo = this.numeroA;
    this.vencimiento = this.vencimientoC;
    this.nLicencia = this.numberLicense;
    this.vencimientoVehiculo = this.vencimientoV;
    this.color = this.colorVehiculo;
    this.observacion = this.observacionRevision;
    this.nLicencia = this.numberLicense;
    this.showIncomplete = true;

    this.createHistory();
    this.close = false;
    this.finalizar= true; 
    this.ModalInstancePreview.close();
    
  }
  finalizarCromatica(){
    this.ModalInstanceQuestion.close();

    this.router.navigate(['/aplicacion/concesion']);
  }



}
