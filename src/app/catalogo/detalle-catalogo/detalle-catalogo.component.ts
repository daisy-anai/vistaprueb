import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CatalogoService } from '../catalogo.service';

//modelo
import { DetalleCatalogo } from '../../shared/models/detalleCatalogo'

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  public catalogo :DetalleCatalogo;

  constructor(
    private route: ActivatedRoute,
    private service?: CatalogoService
  ) { }

  ngOnInit() {

    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      console.log(result.data);
      this.asignarVari(result.data);
    }, error => {
      console.log(error);     
    }); 
    
  }
   asignarVari(catalogo:any){
     this.catalogo =catalogo.catalogo;
     console.log(this.catalogo);
     
   }
}
