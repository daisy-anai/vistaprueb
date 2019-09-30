import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CatalogoService } from '../catalogo.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
//modelo
import { DetalleCatalogo } from '../../shared/models/detalleCatalogo'

 /** 
    @description mutación de eliminar catalogo
    @param eliminarC
  */
const eliminarC = gql`
  mutation eliminarCatalogo($id:ID!){
    downCatalogo(id: $id)
  }`;

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  public catalogo :DetalleCatalogo;
  public catalogos: Array<any>;
  constructor(
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

  eliminarCatalogo(id: Number){
    this.apollo.use('backrevista')
    .mutate({
      mutation: eliminarC,
      variables: {
      id: id
      }
    })
    .subscribe(({ data }) => {
      console.log("Eliminado."+data);    
    //this.deleteCatalogo(data);
      }, (error) => {
        console.log('error');    
    });
  }

   asignarVari(catalogo:any){
     this.catalogo =catalogo.catalogo;
     console.log(this.catalogo); 
   }
   
   
}
