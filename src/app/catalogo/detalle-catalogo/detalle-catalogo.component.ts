import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

// Models
import { Catalogues } from 'src/app/shared/models/catalogues';

// Service
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  public catalogo: Array<Catalogues>;
  private parameter: string; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
  ){}

  ngOnInit() {
   
    this.service.catalogueByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(({ data })=>{
      this.catalogo = data['catalogue'];
      console.log();
      
    });
  }

  catalogueDeprecate(id: Number){  

    this.service.catalogueDeprecate(id,"hola").subscribe(result=>{    
      this.router.navigate(['/aplicacion/catalogo/listar']);
    });
  }
}
