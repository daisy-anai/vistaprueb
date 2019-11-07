import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
// Models
import { Catalogues } from '../../shared/models/catalogues';

// Service
import { CatalogoService } from '../catalogo.service';
import { Modalidad } from 'src/app/shared/models/modalidad';

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  // public catalogo: Array<Catalogues>;
  public catalogo : any;
  public modalidad: Modalidad;
  public localidad; any;
  public deprecated: any;
  private parameter: string;
  private  visible: Boolean  = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
  ){}

  ngOnInit() {
   this.service.catalogueByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(({ data })=>{
      this.catalogo = data['catalogue'];  
   
      this.service.getLocalidad(this.catalogo.id_localidad).subscribe(({ data })=>{
        this.localidad = data['localidad'];
      }); 
      this.service.getModalidad(this.catalogo.id_modalidad).subscribe(({ data })=>{
        this.modalidad = data['modalidad'];   
      });
    });
  } 

  catalogueDeprecate(id: Number){  

    this.service.catalogueDeprecate(id,"hola").subscribe(({ data })=>{  
      this.deprecated = data['catalogueDeprecate'];
      console.log(this.deprecated.id_modalidad);
      
      this.router.navigate([`/aplicacion/catalogo/modalidad/${this.deprecated.id_modalidad}`]);
    });
  } 
}
