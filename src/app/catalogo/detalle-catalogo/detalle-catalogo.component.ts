import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

// Models
import { Catalogo } from 'src/app/shared/models/catalogo';

// Service
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  public catalogo: Catalogo;
  private parameter: string; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
  ){}

  ngOnInit() {
    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      this.catalogo = result.data['catalogo'];
      console.log(this.catalogo);
    }, error => {
      console.log(error);
    });
  }

  /**
    @description Eliminar Catalogo
    @param eliminarCatalogo
  */

  eliminarCatalogo(id: Number){
    this.service.deleteCatalogo(id).subscribe(result  => {
      this.router.navigate(['aplicacion/catalogo/listar'])
    }, (error) => {
        console.log(error);
    });
  }
}