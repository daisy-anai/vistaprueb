import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
//Service
 import { VigenciasService } from '../vigencias.service';
 import { CatalogoService } from '../../catalogo/catalogo.service';


// Models
import { Modalidad } from '../../shared/models/modalidad';
import { Vigencia } from 'src/app/shared/models/vigencia';


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
  constructor(
    private service?: VigenciasService,
    private serviceCatalogo?: CatalogoService,
    private route?: ActivatedRoute
  ) {}

  ngOnInit() {   
  
    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
    this.serviceCatalogo.getModalidad(this.route.snapshot.paramMap.get("id")).subscribe(( {data})=>{
      this.modalidades= data['modalidad']; 
      console.log(this.modalidades);
        
    })

    if(this.route.snapshot.paramMap.get("id")){
      this.service.getVigenciasModalidadByID(this.route.snapshot.paramMap.get("id")).subscribe(({data}) =>{   
        this.vigencias = data['validityByModalidad']; 
        if( Object.keys(this.vigencias).length === 0){
          this.agregarVisible=true;
        }    
      });
     }else{
        this.agregarVisible=true;
        this.buscarVisible=true;
        this.vigenciaVisible=true;
        this.service.getVigencias().subscribe(({data})=>{
        this.vigencias =data['validities'];
      });
    }  
  }

  allValidities(){
    this.service.getVigencias().subscribe(({ data })=>{
      this.vigencias = data['validities']
    })
  }
}
