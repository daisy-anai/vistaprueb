import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//service
import { MediumDataService } from '../../shared/services/medium.data.service';
import {VerificarcionService} from '../verificacion.service';

//module

import { Concesion} from '../../shared/models/concesion';

declare var M: any;

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {
   public historyID : any;
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
   public ModalInstancePreview: any;
   public ModalInstanceQuestion: any;
   public is_correct : boolean= false;
   public download : boolean = false;
   public reportComplete : boolean =false;
   public color: string ='';
   public alert: boolean= true;
   public modalidad: string='';
   public idhistory: string= '';
   public showComplete: boolean= false;
   public showIncomplete: boolean= false;
   public close : boolean= true;
   public finalizar: boolean= false;
 
 

  constructor(
    private route?: ActivatedRoute,
    public shared?: MediumDataService,
    private verificacionService?: VerificarcionService,
    public router?: Router,


  ) {}

  ngOnInit() {

    var modalPreview = document.getElementById('modalPreview');
    this.ModalInstancePreview= M.Modal.init(modalPreview,{
      dismissible:false
    });

    this.concesion= this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();

   this.historyID =  this.route.snapshot.paramMap.get('id');
   this.verificacionService.historyUltimateReviewByVehiculo(this.vehiculo.id).subscribe(({ data })=>{
     this.history  = data['historyUltimateReviewByVehiculo'];
     console.log(this.history);  
   });
   if(!this.vehiculo){
    var toastHTML= '<span><div class="valign-wrapper">No se encontro vehículo<i class="material-icons">error_outline</i> </div></span>';
    M.toast({html: toastHTML});
    this.router.navigate(['/aplicacion/concesion/busqueda']);
  }
  }

  checar(propiedad: any ){
    propiedad.checked = !propiedad.checked; 
    // if(propiedad.checked){
    //   propiedad.checked= false;
    // }else{
    //   propiedad.checked= true;
    // }
  
  } 
  createHistory(){
    var cont = 0;
    this.color= this.colorVehiculo;
    var checkTamanio =document.getElementsByName('check').length
    
    for (const secciones of this.history.review.sections) {
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
 

    this.verificacionService.createHistory(this.history.id_concesion,this.history.id_vehiculo,this.history.catalogue.id,this.history.review,this.is_correct,this.descriptionHistory).subscribe(({data})=>{ 
      this.history = data['history'];
      if(this.is_correct == true){
        this.showComplete = true;;
        this.showIncomplete=false;
      }else{  
        this.showIncomplete = true;
        this.showComplete= false;
      }
      this.idhistory= this.history.id;
    }, (error) => {
      console.log( error)
    });
    
   
  }
  preview(){
    this.ModalInstancePreview.open();
  }
  cancelarPreview(){
    this.descriptionHistory ='';
    this.colorVehiculo='';
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
    this.ModalInstancePreview.close();
 
  }
  finalizarCromatica(){
    this.ModalInstanceQuestion.close();
    this.router.navigate(['/aplicacion/concesion']);
  }
  
}
