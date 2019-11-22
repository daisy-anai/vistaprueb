import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//service
import { MediumDataService } from '../../shared/services/medium.data.service';
import { CatalogoService } from '../../catalogo/catalogo.service';
import { Concesion} from '../../shared/models/concesion';
import { Vehiculo} from '../../shared/models/vehiculo';
import { validateOperation } from 'apollo-link/lib/linkUtils';

declare var M: any;
declare var prop: [];
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
  public checkForm: FormGroup;
  public checks: string ='';
  public properties = [];

  constructor(
    private route?: ActivatedRoute,
    private catalogueService?: CatalogoService,
    public shared?: MediumDataService,
    public router?: Router,
    private formBuilder?: FormBuilder
  ) {}

  ngOnInit() {
    this.concesion= this.shared.getConcesion();
    this.vehiculo = this.shared.getVehiculo();
    console.log(this.concesion, this.vehiculo);
    
    // if(!this.vehiculo){
      
    //   var toastHTML= '<span><div class="valign-wrapper">No se encontro vehículo<i class="material-icons">error_outline</i> </div></span>';
    //   M.toast({html: toastHTML});
    //   this.router.navigate(['/aplicacion/concesion/busqueda']);
    // }
    
    this.catalogueID= this.route.snapshot.paramMap.get('id');
    this.catalogueService.catalogueByID( this.route.snapshot.paramMap.get("id")).subscribe(({ data })=>{
      this.catalogues = data['catalogue'];               
      console.log(this.catalogues.configuration.sections);
      for (const propiedad of this.catalogues.configuration.sections) {
        console.log(propiedad.properties);
        
      }
      
   });  
   this.checkForm = this.formBuilder.group({
     check :['', Validators.required]
   });
  
   
  }

 checksComplete(){
  var che= document.getElementById('check')
  console.log(this.checks, che);
  
 }
 checksIncomplete(){

 }
 
//  watchcheck(ev, index) {
//  var  propiedad = [];
//      if(ev.target.checked == true) {
//          this.propiedad.push(ev.target.value);
//      }
//      else {
//          for(let i = 0;i < propiedad.length; i++) {
//              if(propiedad[i] == ev.target.value) {
//                  this.propiedad.splice(i,1);
//              }
//          }
//      }
//   }
 }
