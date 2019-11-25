import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray , FormBuilder, Validators, Form} from '@angular/forms';

//service
import { MediumDataService } from '../../shared/services/medium.data.service';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Concesion} from '../../shared/models/concesion';
import { Vehiculo} from '../../shared/models/vehiculo';
import {VerificarcionService} from '../verificacion.service';

declare var M: any;
@Component({
  selector: 'app-check-verificacion',
  templateUrl: './check-verificacion.component.html',
  styleUrls: ['./check-verificacion.component.css']
})

export class CheckVerificacionComponent implements OnInit {
  public catalogueID :string;
  private catalogues: any;
  public type: string = 'texto'; 
  public concesion : Concesion;
  public vehiculo : any;
  public history: any;
  public proipiedacCheck: any;
  public descriptionHistory : string = '';
  public ModalInstance: any;
  public ModalInstanceDownload :any;
  public ModalInstanceIncomplete: any;

  public is_correct : boolean= false;
  public download : boolean = false;
  public color: string ='';

  constructor(
    private route?: ActivatedRoute,
    private catalogueService?: CatalogoService,
    public shared?: MediumDataService,
    public router?: Router,
    public service?: VerificarcionService,
    public formBuilder?: FormBuilder
   
  ) {}

  ngOnInit() {
  
    var modal = document.getElementById('descriptionModal');
		this.ModalInstance = M.Modal.init(modal, {
      dismissible:false
    });
  
    var modalCorrect = document.getElementById('download');
		this.ModalInstanceDownload = M.Modal.init(modalCorrect, {
      dismissible:false
    });

    var modalIncomplete = document.getElementById('downloadIncomplete');
    this.ModalInstanceIncomplete = M.Modal.init(modalIncomplete,{
      dismissible: false
    })

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
      
      // for (const proper of this.catalogues.configuration.sections ) {
      //   var propiedad = proper.properties as FormArray;
      //   proper.properties.push(this.formBuilder.group({
      //     checked:[false, Validators.required]
      //   }));
      // }
      //   console.log(this.catalogues);
        
   });     
   
  }

  checar(propiedad: any ){
    console.log(this.catalogues)
    propiedad.checked = !propiedad.checked;  
    console.log(propiedad.checked);
    
  } 

  createHistory(){
    var cont = 0;
    var checkTamanio =document.getElementsByName('check').length

    console.log(this.catalogues);
    // for (const secciones of this.catalogues.configuration.sections) {
    //   console.log(secciones.properties);
      
    // }
    for (var i = 0; i < this.catalogues.configuration.sections.length; i++) {
      for (let j = 0; j < this.catalogues.configuration.sections[i].properties.length; j++) {
        if(this.catalogues.configuration.sections[i].properties[j].checked==true){
          console.log(this.catalogues.configuration.sections[i].properties[j]);
          
          cont ++;
          if(checkTamanio == cont){
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
        this.ModalInstanceDownload.open();
      }else{
        this.ModalInstanceIncomplete.open();
      }
    });
  }

  openModalDescription(){
    this.ModalInstance.open();
  }

  dowloadPDF(){
    this.ModalInstanceDownload.close(); 
  }
  dowloandIncompletePDF(){
    this.ModalInstanceIncomplete.close();
  }

 }
