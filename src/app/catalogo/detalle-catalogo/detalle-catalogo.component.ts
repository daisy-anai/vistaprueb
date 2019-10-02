import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CatalogoService } from '../catalogo.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
//modelo
import { DetalleCatalogo } from '../../shared/models/detalleCatalogo'


@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  public catalogo :DetalleCatalogo;
  public catalogos: Array<any>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
    private apollo?: Apollo
 ) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal({dismissible: false});
    });

    
    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      console.log(result.data);
      this.asignarVari(result.data);
    }, error => {
      console.log(error);     
    }); 
  }
 /** 
    @description mutación de eliminar catalogo
    @param eliminarC
    */
  eliminarCatalogo(id: Number){
    const eliminarC = gql`
    mutation eliminarCatalogo($id:ID!){
    downCatalogo(id: $id)
    }`;

    this.apollo.use('backrevista')
    .mutate({
      mutation: eliminarC,
      variables: {
      id: id
      }
    })
    .subscribe((result)  => {   
      console.log(result.data['downCatalogo']);  
      this.router.navigate(['aplicacion/catalogo/listar'])
      }, (error) => {
        console.log('error');    
    });
  }

   asignarVari(catalogo:any){
     this.catalogo =catalogo.catalogo;
     console.log(this.catalogo); 
   }
   
   
}
