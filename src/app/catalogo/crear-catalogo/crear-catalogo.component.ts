import { Component, OnInit, TestabilityRegistry, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo} from 'apollo-angular';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import { TipoCatalogo } from '../../shared/models/tipoCatalogo';
import { TipoPropiedad } from '../../shared/models/tipoPropiedad';
import { Propiedad } from '../../shared/models/propiedad';
import { Catalogo } from '../../shared/models/catalogo';
import { SeccionVO} from '../../shared/models/seccion.vo';
import { HelpSeccion } from '../../shared/models/helpSeccion';

// Services
import {CatalogoService} from '../catalogo.service';

declare var M: any;

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css'],

})
export class CrearCatalogoComponent implements OnInit {
  public catalogoForm: FormGroup;
  public modalidades: Array<Modalidad>;
  public tiposCatalago: Array<TipoCatalogo>;
  public tiposPropiedad: Array<TipoPropiedad>;
  public secciones: Array<SeccionVO>;
  public propiedades: Array<Propiedad>;
  public catalogos: Array<Catalogo>;
  public seccionesForm: any;

  public totalSecciones: number = 0;
  public totalPropiedades: number=0;
  constructor(
    private apollo?: Apollo,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private router ?: Router
  ) {}

  ngOnInit() {
 
    this.service.getCatalogos().subscribe(result => {
      this.catalogos = result.data['catalogos'];
    });

    this.service.getSecciones().subscribe(result => {
      this.secciones = result.data['secciones'];
    });

    this.service.getPropiedades().subscribe(result => {
      this.propiedades = result.data['propiedades'];
    })

    this.service.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
    });

    this.service.getTiposCatalogo().subscribe(result => {
      this.tiposCatalago = result.data['tiposCatalogo'];
    });

    this.service.getTipoPropiedad().subscribe(result => {
      this.tiposPropiedad = result.data['tiposPropiedad'];
    });

    this.catalogoForm = this.formBuilder.group({
      id_modalidad: ['', Validators.required],
      id_tipo_catalogo: ['', Validators.required],
      nombre: ['', Validators.required],
      secciones: new FormArray([], Validators.required)
    });
  }
  /**
    @description Nombre del catalogo
    @param catalogo
  */

   watchCatalogoNombre(): Boolean {
    let value = this.catalogoForm.get('nombre').value.toLowerCase().trim();
    if(this.catalogos){
      const result = this.catalogos.filter(word => word.nombre.toLowerCase().trim() === value);
      return result.length >= 1 ? true : false;
    }
    return false;
  }

  /**
    @description Selección de secciones
    @param seccion
  */
  watchSeccionNombre(nombre:string, seccion: Number): Boolean {    
    var words = this.secciones.filter(seccion => {
      return seccion.nombre.toLowerCase().trim() == nombre;
    })

    if(words.length > 0)
      return true; 

    let help = this.catalogoForm.get('secciones').value;
    for (let i = 0; i < help.length && i != seccion; i++) {      
      if(help[i].nombre.toLowerCase().trim() == nombre.toLowerCase().trim()){
        return true;
      }
    }
    return false;
  }
    
  addSeccion() {
    this.totalSecciones += 1;
    this.seccionesController();
  }

  removeSeccion(indice: any, seccionRemove: any) {
    let seccionNew = new HelpSeccion;
    seccionNew.id = seccionRemove.value.id_seccion;
    seccionNew.nombre= seccionRemove.value.nombre;
    seccionNew.estatus =true;
    this.secciones.push(seccionNew);
    this.totalSecciones -= 1;
    this.newseccionesController(indice);
  } 

  newseccionesController(indice: any){
    let controles = this.catalogoForm.controls;
    let secciones = controles.secciones as FormArray;
    //secciones.controls.removeAt(indice);
    secciones.controls.splice(indice,1);
    this.seccionesController();
  }
  
  seccionesController() {
    let controles = this.catalogoForm.controls;
    let secciones = controles.secciones as FormArray;    
    this.seccionesForm = secciones.controls;
     if (secciones.length < this.totalSecciones) {       
      for (let i = secciones.length; i < this.totalSecciones; i++) {
        secciones.push(this.formBuilder.group({
          id_seccion: [''],
          nombre: ['', Validators.required],
          propiedades: new FormArray([], Validators.required)
        }));
      }
    } else {
      for (let i = secciones.length; i >= this.totalSecciones; i--) {
        secciones.removeAt(i);       
      }
    }
  }

  autocompleteSecciones(e:any, seccion:number){
    if(this.watchSeccionNombre(e, seccion)){
      console.log("Nombre repetido");
    }

    let datos = {};
    for(let seccion of this.secciones){
      datos[seccion.nombre] = null;
    }

    var elems = document.querySelectorAll('input.autocomplete');
    var [instances] = M.Autocomplete.init(elems, {
      data: datos
    }); 
  }
 
 
 /**
    @description Selección de propiedades
    @param propiedad
  */

  watchPropiedadNombre(nombre: string, seccion: number, propiedad: number): Boolean {   
    let words = this.propiedades.filter(it => {
      return it.nombre.toLocaleLowerCase().trim() == nombre.toLowerCase().trim();    
    })

    if(words.length > 0)
      return true; 
      
    let secc = this.catalogoForm.get('secciones').value; 
    for (let index = 0; index < secc.length; index++) {       
      let help = secc[index].propiedades;   
      for (let i = 0; i < help.length ; i++) {                  
        if(help[i].nombre.toLowerCase().trim() == nombre.toLowerCase().trim())   
          console.log("Nombre repetido");
          return true; 
         }
      }
    return false; 
  }

  addPropiedad(seccion: number) {
    let valor = this.propiedadesControls(seccion).length;
    this.propiedadesForm(seccion, valor+=1);
    console.log("addvalor",valor);
    
  }
   remove(index : number){
    let valor = this.propiedadesControls(index).length;
    this.propiedadesForm(index, valor-=1);  

   }

  propiedadesControls(index: any) {
    let controles = this.seccionesForm;
    let propiedades = controles.propiedades as FormArray;
   return  this.seccionesForm[index]['controls']['propiedades'] as FormArray; 
     
  }
 
  propiedadesForm(seccion: number, valor: number) {

    let propiedades = this.propiedadesControls(seccion);
  
    if(propiedades.length < valor){
      for (let i = propiedades.length; i < valor; i++) {
        propiedades.push(this.formBuilder.group({
          id_propiedad: ['', Validators.required],
          nombre: ['', Validators.required],
          id_tipo_propiedad: ['', Validators.required]
        }));
      }
    }else {
      for(let i = propiedades.length; i >= valor; i--){
        propiedades.removeAt(i);
      }
    }
  }

  autocompletePropiedades(nombre: any, seccion: number, propiedad: number){
    this.watchPropiedadNombre(nombre, seccion, propiedad); 
    let datos = {};
    for(let propiedad of this.propiedades){
      datos[propiedad.nombre] = null;
    }

    var elems = document.querySelectorAll('input.autocomplete');
    var [instances] = M.Autocomplete.init(elems, {
      data: datos
    });
  }

  /**
    @description Crear Catalogo Mutation
    @param createdCatalogo
  */
 
  crearCatalogo(){
   const id_modalidad = this.catalogoForm.value.id_modalidad;
   const id_tipo_catalogo= this.catalogoForm.value.id_tipo_catalogo;
   const nombre= this.catalogoForm.value.nombre;
   const seccion = this.catalogoForm.value.secciones;

   this.service.createCatalogo(id_modalidad,id_tipo_catalogo,nombre,seccion).subscribe(result =>{
    this.router.navigate(['aplicacion/catalogo/listar'])
    },error =>{
      console.log(error);     
    });
  }
}
