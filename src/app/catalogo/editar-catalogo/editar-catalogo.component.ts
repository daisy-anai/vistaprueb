import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.component.html',
  styleUrls: ['./editar-catalogo.component.css']
})
export class EditarCatalogoComponent implements OnInit {
   public catalogo: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private service?: CatalogoService) { }

  ngOnInit() {
    //obtener mi id, mostrar los elementos de ese id
    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      console.log(result.data);
      this.asignarVariable(result.data);
    }, error => {
      console.log(error);     
    }); 
    
  }
   asignarVariable(catalogo:any){
     this.catalogo =catalogo.catalogo;
     console.log(this.catalogo);
     
   }
   //modificar catalogo
   modificarCatalogo(id: number){
    this.service.getEditCatalogo(id).subscribe(result => {
      console.log(this.service.getEditCatalogo(id));      
      console.log("eliminado");    
    }, error =>{
      console.log(error);     
    });
     
   }
  
}
