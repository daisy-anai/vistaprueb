import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
//modelos
import { Modalidad } from '../../shared/models/modalidad';
import { TipoCatalogo } from '../../shared/models/tipoCatalogo';
import { SeccionVO} from '../../shared/models/seccion.vo';
import { Propiedad } from '../../shared/models/propiedad';
import { Catalogo } from '../../shared/models/catalogo';
import { TipoPropiedad } from '../../shared/models/tipoPropiedad';
import { Location } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.component.html',
  styleUrls: ['./editar-catalogo.component.css']
})
export class EditarCatalogoComponent implements OnInit {
  public catalogo: any;
  public catalogoForm: FormGroup;
  public modalidades: Array<Modalidad>;
  public tiposCatalago: Array<TipoCatalogo>;
  public totalSecciones: number = 0;
  public seccionesForm: any;
  public secciones: Array<SeccionVO>;
  public propiedades: Array<Propiedad>;
  public catalogos: Array<Catalogo>;
  public tiposPropiedad:Array<TipoPropiedad>;

  constructor(
    private route: ActivatedRoute,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private navigate?: Location

  ) {}

  ngOnInit() {
    this.service.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
    });

    this.service.getTiposCatalogo().subscribe(result => {
      this.tiposCatalago = result.data['tiposCatalogo'];
    });

    this.service.getTipoPropiedad().subscribe(result => {
      this.tiposPropiedad = result.data['tiposPropiedad'];

    });

    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      this.catalogo = result.data['catalogo'];
     // console.log(this.catalogo);

      this.catalogoForm = this.formBuilder.group({
        id_modalidad: [this.catalogo.modalidad.id, Validators.required],
        id_tipo_catalogo: [this.catalogo.tipoCatalogo.id, Validators.required],
        nombre: [this.catalogo['nombre'], Validators.required],
        secciones: new FormArray([], Validators.required)
      });

      let controls = this.catalogoForm.controls;
      let secciones = controls.secciones as FormArray;
      this.seccionesForm = secciones.controls;

      for (const seccion of this.catalogo['secciones']) {
        let seccionGroup = this.formBuilder.group({
          id_seccion: [seccion.id],
          nombre: [seccion.nombre, Validators.required],
          propiedades: new FormArray([], Validators.required)
        });

        let propiedadGroup = seccionGroup.controls.propiedades as FormArray;
        for(const propiedad of seccion['propiedades']){
          propiedadGroup.push(this.formBuilder.group({
            id_propiedad: [propiedad.id],
            nombre: [propiedad.nombre],
            // nombreProp[propiedad.x],
            id_tipo_propiedad: [propiedad.tipoPropiedad.id, Validators.required]
          }));
        }
        secciones.push(seccionGroup);
      }

      this.seccionesForm = secciones.controls;
     // console.log(this.seccionesForm)
    }, error => {
      console.log(error);
    });
  }

  /**
    @description Nombre Catalogo
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
    @description Seleccion de secciones
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

  removeSeccion() {
    this.totalSecciones -= 1;
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

   /**
    @description Seleccion de propiedades
    @param propiedad
  */
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
          nombreProp:['', Validators.required],
          id_tipo_propiedad: ['', Validators.required]

        }));
      }
    }else {
      for(let i = propiedades.length; i >= valor; i--){
        propiedades.removeAt(i);
      }
    }
  }

  autocompletePropiedades(e){
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
    @description Modificar Catalogo Mutation
    @param Modificar
  */
  modificarCatalogo(){
     this.navigate.back()
    console.log("-->");
    
    // this.service.editCatalogo().subscribe(({data})=>{
    
    // });
  }

}
