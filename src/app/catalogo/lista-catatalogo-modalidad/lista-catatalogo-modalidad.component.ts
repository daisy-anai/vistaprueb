import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from "@angular/router";
import { DetalleCatalogo} from '../../shared/models/detalleCatalogo';
import { Catalogo } from 'src/app/shared/models/catalogo';


// Servicios
import { CatalogoService } from '../catalogo.service';


@Component({
  selector: 'app-lista-catatalogo-modalidad',
  templateUrl: './lista-catatalogo-modalidad.component.html',
  styleUrls: ['./lista-catatalogo-modalidad.component.css']
})
export class ListaCatatalogoModalidadComponent implements OnInit {
  public catalogos: Array<Catalogo>;
  
  constructor(private apollo: Apollo, 
    private service?: CatalogoService,
    private route?: ActivatedRoute,
    private router?: Router
  ) 
  {}

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });

    this.service.getCatalogoByModalidad(this.route.snapshot.paramMap.get("id")).subscribe(result => {
      this.catalogos = result.data['catalogos']; 
      console.log(this.catalogos);
      
    }); 
  }
  
}
