import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CatalogoService } from '../catalogo.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
//modelo
import { DetalleCatalogo } from '../../shared/models/detalleCatalogo'
import { Catalogo } from 'src/app/shared/models/catalogo';


@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  public catalogo :DetalleCatalogo;
  //public catalogos: Array<any>;
  public catalgos : Catalogo;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
    private apollo?: Apollo
  ){}

  ngOnInit() {

    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      this.catalogo = result.data['catalogo']; 
    }, error => {
      console.log(error);
    });
  }

  eliminarCatalogo(id: Number){
    this.service.deleteCatalogo(id).subscribe((result)  => {
      this.router.navigate(['aplicacion/catalogo/listar'])
    }, (error) => {
        console.log('error');
    });
  }
}
