import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
//Service
 import { VigenciasService } from '../vigencias.service';
 import { CatalogoService } from '../../catalogo/catalogo.service';


// Models
import { Modalidad } from '../../shared/models/modalidad';
import { Vigencia } from 'src/app/shared/models/vigencia';
import { element } from 'protractor';
declare var M: any;

@Component({
  selector: 'app-listar-vigencias',
  templateUrl: './listar-vigencias.component.html',
  styleUrls: ['./listar-vigencias.component.css']
})
export class ListarVigenciasComponent implements OnInit {
  public modalidades: Array<Modalidad>;
  private vigencias: Array<Vigencia>; 
  public filtro: string;
  public buscarVisible: Boolean =false;
  public agregarVisible: Boolean = false;
  public vigenciaVisible: Boolean = false;
  public modalvisible: Boolean= false; 
  public vigenciaModal: any;
  public sinCatalogo: Boolean= false;
  constructor(
    private service?: VigenciasService,
    private serviceCatalogo?: CatalogoService,
    private route?: ActivatedRoute
  ) {}

  ngOnInit() {    
  
    this.serviceCatalogo.getModalidad(this.route.snapshot.paramMap.get("id")).subscribe(( {data})=>{
      this.modalidades= data['modalidad']; 
    });

    if(this.route.snapshot.paramMap.get("id")){
      this.service.getVigenciasModalidadByID(this.route.snapshot.paramMap.get("id")).subscribe(({data}) =>{   
        this.vigencias = data['validityByModalidad']; 
        console.log(this.vigencias);
          if( Object.keys(this.vigencias).length === 0){
            this.agregarVisible=true;  
            this.sinCatalogo=true;       
          }    
      });
     }else{
     
        this.agregarVisible=true;
        this.buscarVisible=true;
        this.vigenciaVisible=true;
        this.service.getVigencias().subscribe(({data})=>{
        this.vigencias =data['validities'];
        console.log(this.vigencias);
        
      });
    }  
  }

  allValidities(){
    this.service.getVigencias().subscribe(({ data })=>{
      this.vigencias = data['validities']
    })
  }
}
