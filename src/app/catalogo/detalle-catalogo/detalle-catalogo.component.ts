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
  public catalogo : any;
  public ModalInstance: any;
  public collapsibleInstance: any;
  public modalidad: Modalidad;
  public localidad; any;
  public deprecated: any;
  public typeCatalogue: boolean= true;
  public type: string = 'texto';  
  public descripcionDeprecated : string = '';
  public secciones: Boolean= true;
  public propiedades: Boolean= false;
  public regresar: Boolean= false;
  public descripcion: Boolean= false;
  public variable: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service?: CatalogoService,
  ){}

  ngOnInit() {
    $('.collapsible').collapsible();
    $('input#description').characterCounter();  
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
    });
  
  } 
  
  seeCarousel(){
    this.variable = true;
    $(function(){ $('.carousel.carousel-slider').carousel({
      full_width: false,
      indicators: true
    }); 
    });
  }

  preview(){
    this.ModalInstance.open();
    }

  catalogueDeprecate(id: string){  
    
    this.service.catalogueDeprecate(id, this.descripcionDeprecated).subscribe(({ data })=>{  
      this.deprecated = data['catalogueDeprecate'];
      this.router.navigate([`/aplicacion/catalogo/modalidad/${this.deprecated.id_modalidad}`]);
    });
  } 
  next(){
    this.secciones= false;
    this.propiedades= true;
    this.regresar= true;
  }
  back(){
    this.propiedades= false;
    this.secciones= true;
    this.regresar= false; 
  }
}
