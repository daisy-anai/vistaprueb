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

  constructor(
    private service?: VigenciasService,
    private serviceCatalogo?: CatalogoService,
    private route?: ActivatedRoute
  ) {}

  ngOnInit() {   
  
    if(this.route.snapshot.paramMap.get("id")){
      this.service.getVigenciasModalidadByID(this.route.snapshot.paramMap.get("id")).subscribe(({data}) =>{   
        this.vigencias = data['validityByModalidad']; 
      });
     }else{
      this.service.getVigencias().subscribe(({data})=>{
        this.vigencias =data['validities'];
      });
    }  
  }
}
