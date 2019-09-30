import { Component, OnInit, TestabilityRegistry, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
// Modelos
import { Modalidad } from '../../shared/models/modalidad';
import { TipoCatalogo } from '../../shared/models/tipoCatalogo';
import { TipoPropiedad } from '../../shared/models/tipoPropiedad';
import { Seccion } from '../../shared/models/seccion';
import { Propiedad } from '../../shared/models/propiedad';
import { Catalogo } from '../../shared/models/catalogo';
import { DetalleCatalogo} from '../../shared/models/detalleCatalogo';
import { SeccionVO} from '../../shared/models/seccion.vo';
//servicios
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

  constructor(
    private apollo?: Apollo,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder
  ) {}

  ngOnInit() {
    this.service.getCatalogos().subscribe(result => {
      this.catalogos = result.data['catalogos'];
    });

    this.service.getSecciones().subscribe(result => {
      this.secciones = result.data['secciones'];
    });

    this.service.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
    });

    this.service.getTiposCatalogo().subscribe(result => {
      this.tiposCatalago = result.data['tiposCatalogo'];
    });

    this.service.getTipoPropiedad().subscribe(result => {
      this.tiposPropiedad = result.data['tiposPropiedad'];
    });

    this.service.getPropiedades().subscribe(result => {
      this.propiedades = result.data['propiedades'];
    })

    this.catalogoForm = this.formBuilder.group({
      id_modalidad: ['', Validators.required],
      id_tipo_catalogo: ['', Validators.required],
      nombre: ['', Validators.required],
      secciones: new FormArray([], Validators.required)
    });
  }

  /** 
    @description Seleccion de secciones
    @param seccion
  */
  watchSeccionNombre(seccion: Number):void {
    let value = (<HTMLInputElement>document.getElementById(`S[${seccion}]-nombre`)).value.toLowerCase().trim();
    for(var i = 0; i < this.secciones.length; i++){
    if(this.secciones[i].nombre.toLowerCase() == value.toLowerCase()){
      this.catalogoForm.controls.secciones['controls'][seccion].controls.nombre.setValue(this.secciones[i].nombre);
      this.catalogoForm.controls.secciones['controls'][seccion].controls.id_seccion.setValue(parseInt(this.secciones[i].id));
      this.secciones.splice(i,1);
    }
   }
  }

  //seleccion de propiedades
  watchPropiedadNombre(seccion: number,propiedad: number): void{
    let value = (<HTMLInputElement>document.getElementById(`S[${seccion}]-P[${propiedad}]-nombre`)).value.toLowerCase().trim();
    if(this.propiedades){
      let result = this.propiedades.filter(word => word.nombre.toLowerCase().trim() === value)
      if(result.length == 0){
        this.catalogoForm.controls.secciones['controls'][seccion].controls.propiedades.controls[propiedad].controls.nombre.setValue(value);
      }else{
        // this.catalogoForm.controls.secciones[propiedades].controls[propiedad].controls.id_propiedad.setValue(result[0].id);
        this.catalogoForm.controls.secciones['controls'][seccion].controls.propiedades.controls[propiedad].controls.id_propiedad.setValue(result[0].id);
      }
    }
  }
  watchCatalogoNombre(): Boolean {
    let value = this.catalogoForm.get('nombre').value.toLowerCase().trim();
    if(this.catalogos){
      const result = this.catalogos.filter(word => word.nombre.toLowerCase().trim() === value);
      return result.length >= 1 ? true : false;
    }
    return false;
  }

  // Control de las secciones
  addSeccion() {
    this.totalSecciones += 1;
    this.seccionesController();
  }

  removeSeccion(indice: any, propiedad: any) {
    let seccionew = new SeccionVO;
    seccionew.id = propiedad.value.id_seccion;
    seccionew.nombre= propiedad.value.nombre;
    seccionew.estatus =true;
    seccionew.create = new Date();
     this.secciones.push(seccionew);
     this.totalSecciones -= 1;
    //this.seccionesController();
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

  autocompleteSecciones(e, seccion){
  // this.watchSeccionNombre(seccion);
    let datos = {};
    for(let seccion of this.secciones){
      datos[seccion.nombre] = null;
    }
    var elems = document.querySelectorAll('input.autocomplete');
    var [instances] = M.Autocomplete.init(elems, {
      data: datos
    });
 
  }

  addPropiedad(seccion: number) {
    let valor = this.propiedadesControls(seccion).length;
    this.propiedadesForm(seccion, valor+=1);
  }

  removePropiedad(seccion: number) {
    let valor = this.propiedadesControls(seccion).length;
    this.propiedadesForm(seccion, valor-=1);
  }

  propiedadesControls(seccion) {
    return this.seccionesForm[seccion]['controls']['propiedades'] as FormArray;
  }

  propiedadesForm(seccion: number, valor: number) {
    let propiedades = this.propiedadesControls(seccion);

    if(propiedades.length < valor){
      for (let i = propiedades.length; i < valor; i++) {
        propiedades.push(this.formBuilder.group({
          id_propiedad: ['', Validators.required],
          nombre: ['', Validators.required],
          tipoPropiedad: ['', Validators.required]
        }));
      }
    }else {
      for(let i = propiedades.length; i >= valor; i--){
        propiedades.removeAt(i);
      }
    }
  }

  autocompletePropiedades(e){
 /*
    let datos = {};
    for(let propiedad of this.propiedades){
      datos[propiedad.nombre] = null;
    }

    var elems = document.querySelectorAll('input.autocomplete');
    var [instances] = M.Autocomplete.init(elems, {
      data: datos
    });

    */
  }

  CrearCatalogo(){
   console.log(this.catalogoForm.value);
   const id_modalidad = this.catalogoForm.value.id_modalidad;
   const id_tipo_catalogo= this.catalogoForm.value.id_tipo_catalogo;
   const nombre= this.catalogoForm.value.nombre;
   const seccion = this.catalogoForm.value.secciones[0].nombre;

console.log(seccion);

   const propiedad = this.catalogoForm.value.propiedad;
   const tipoPropiedad= this.catalogoForm.value.tipoPropiedad;
  
   const createdCatalogo= gql`
   mutation crear($id_modalidad:ID!, $id_tipo_catalogo:ID!, $nombre:String!, $secciones:[SeccionesInput!]!){
    catalogo (id_modalidad:$id_modalidad,id_tipo_catalogo:$id_tipo_catalogo, nombre:$nombre,secciones:$secciones){
      modalidad {
        id
        nombre
      }
      tipoCatalogo{
        id
        nombre
      }
      nombre
      secciones{
        nombre
        propiedades{
          nombre
          tipoPropiedad{
            nombre
          }
        }
      }
    }
  }`;
   
    this.apollo.use('backrevista')
    .mutate({
      mutation: createdCatalogo,
      variables: {
      id_modalidad: id_modalidad,
      id_tipo_catalogo: id_tipo_catalogo,
      nombre: nombre,
      secciones:[{
        nombre: seccion,
        propiedades: [{
          nombre: propiedad,
          id_tipo_propiedad: tipoPropiedad
        }]
      }]
      }
    })
    .subscribe((data) => {
      console.log(data);    
      }, (error) => {
        console.log('error en crear catalogo');    
    });

  }
}
