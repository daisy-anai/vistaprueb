import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray , FormBuilder, Validators, Form} from '@angular/forms';

//service
import { MediumDataService } from '../../shared/services/medium.data.service';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Concesion} from '../../shared/models/concesion';
import { Vehiculo} from '../../shared/models/vehiculo';
import {VerificarcionService} from '../verificacion.service';
import { VehiculoService } from '../../vehiculo/vehiculo.service';
import { resetCaches } from 'graphql-tag';


declare var M: any;
@Component({
  selector: 'app-check-verificacion-cromatica',
  templateUrl: './check-verificacion-cromatica.component.html',
  styleUrls: ['./check-verificacion-cromatica.component.css']
})

export class CheckVerificacionCromaticaComponent implements OnInit {
  public catalogueID :string;
  private catalogues: any;
  public type: string = 'texto'; 
  public concesion : Concesion;
  public vehiculo : any;
  public history: any;
  public proipiedacCheck: any;
  public descriptionHistory : string = '';
  public colorVehiculo: string ='';
  public ModalInstance: any;
  public ModalInstanceDownload :any;
  public ModalInstanceIncomplete: any;
  public ModalInstancePreview: any;
  public ModalInstanceQuestion: any;
  public saludo : string="hola";
  public is_correct : boolean= false;
  public download : boolean = false;
  public reportComplete : boolean =false;
  public color: string ='';
  public alert: boolean= true;

  public showComplete: boolean= false;
  public showIncomplete: boolean= false;
  public close : boolean= true;
  public finalizar: boolean= false;
  constructor(
    private route?: ActivatedRoute,
    private catalogueService?: CatalogoService,
    public shared?: MediumDataService,
    public router?: Router,
    public service?: VerificarcionService,
    public formBuilder?: FormBuilder,
    public vehiculoService?: VehiculoService
   
  ) {}

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
    var question = document.getElementById('question');
		this.ModalInstanceQuestion = M.Modal.init(question, {
      dismissible:false
    });
    this.ModalInstanceQuestion.open();
  }
  aceptado(){
    this.createHistory();
    this.close = false;
    this.finalizar= true;
  }
  finalizarCromatica(){
    this.router.navigate(['/aplicacion/concesion']);
      this.ModalInstance.close();
    this.ModalInstancePreview.close();
  }
  
 }
