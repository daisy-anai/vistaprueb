import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route?: ActivatedRoute,
    private catalogueService?: CatalogoService,
    public shared?: MediumDataService,
    public router?: Router,
    public service?: VerificarcionService
   
  ) {}

  ngOnInit() {
    var modal = document.getElementById('descriptionModal');
		this.ModalInstance = M.Modal.init(modal, {
      dismissible:false
    });
    this.concesion= this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
 
    // if(!this.vehiculo){
      
    //   var toastHTML= '<span><div class="valign-wrapper">No se encontro vehículo<i class="material-icons">error_outline</i> </div></span>';
    //   M.toast({html: toastHTML});
    //   this.router.navigate(['/aplicacion/concesion/busqueda']);
    // }
    
    this.catalogueID= this.route.snapshot.paramMap.get('id');
    this.catalogueService.catalogueByID( this.route.snapshot.paramMap.get("id")).subscribe(({ data })=>{
      this.catalogues = data['catalogue'];               
   });  
   
  }
  checar(propiedad: any){
    propiedad.checked = !propiedad.checked;    
  } 

  createHistory(){
  
    var id_concesion = this.concesion.id;
    var id_vehiculo = this.vehiculo.id;
    var id_catalogue = this.catalogues.id
    var is_correct = true;
    var id_concesion = this.concesion.id;

    console.log(id_concesion,id_vehiculo,id_catalogue,this.catalogues.configuration,is_correct,this.descriptionHistory);

    this.service.createHistory(id_concesion,id_vehiculo,id_catalogue,this.catalogues.configuration,is_correct,this.descriptionHistory).subscribe(({data})=>{ 
      this.history = data['history'];
    });
}

  openModalDescription(){
 
    this.ModalInstance.open();
  }

  analizeChecked() {
    //  
  }

 }
