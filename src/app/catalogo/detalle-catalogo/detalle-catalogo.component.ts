import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
// Models
import { Catalogues } from '../../shared/models/catalogues';

// Service
import { CatalogoService } from '../catalogo.service';
import { Modalidad } from 'src/app/shared/models/modalidad';
declare var M: any;
@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {
  // public catalogo: Array<Catalogues>;
  public catalogo : any;
  public ModalInstance: any;
  public modalquestion:any;
  public modalidad: Modalidad;
  public localidad; any;
  public deprecated: any;
  private parameter: string;
  private  visible: Boolean  = false;
  private typeCatalogue: Boolean= false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
  ){}

  ngOnInit() {

    var modal = document.getElementById('descriptionModal');
		this.ModalInstance = M.Modal.init(modal, {
      dismissible:false
    });
  
   this.service.catalogueByID( this.route.snapshot.paramMap.get("id")).subscribe(({ data })=>{
      this.catalogo = data['catalogue']; 
      this.service.getLocalidad(this.catalogo.id_localidad).subscribe(({ data })=>{
        this.localidad = data['localidad'];
      }); 
      this.service.getModalidad(this.catalogo.id_modalidad).subscribe(({ data })=>{
        this.modalidad = data['modalidad'];   
      });

      for (let section of this.catalogo.configuration.sections) {  
        for (let property of section.properties) {
          if(property.propertyType  == 'Texto'){
            this.typeCatalogue= true;
          }
          else{
          this.typeCatalogue= false;
         }
        }       
      }
    });
  } 

  preview(){
    this.ModalInstance.open();
    }

  catalogueDeprecate(id: string){  
    var  description= $('#descripcion').val();
    this.service.catalogueDeprecate(id,String(description)).subscribe(({ data })=>{  
      this.deprecated = data['catalogueDeprecate'];
      this.router.navigate([`/aplicacion/catalogo/modalidad/${this.deprecated.id_modalidad}`]);
    });
  } 

}
