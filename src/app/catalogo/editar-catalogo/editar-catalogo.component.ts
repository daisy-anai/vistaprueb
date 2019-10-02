import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Modalidad } from '../../shared/models/modalidad';
import { TipoCatalogo } from '../../shared/models/tipoCatalogo';

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

  constructor(
    private route: ActivatedRoute,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder
  ) {}

  ngOnInit() {
    this.service.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
    });

    this.service.getTiposCatalogo().subscribe(result => {
      this.tiposCatalago = result.data['tiposCatalogo'];
    });

    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      this.catalogo = result.data['catalogo'];
      console.log(this.catalogo);

      this.catalogoForm = this.formBuilder.group({
        id_modalidad: [this.catalogo.modalidad.id, Validators.required],
        id_tipo_catalogo: [this.catalogo.tipoCatalogo.id, Validators.required],
        nombre: [this.catalogo['nombre'], Validators.required],
        secciones: new FormArray([], Validators.required)
      });  
    }, error => {
      console.log(error);     
    }); 
  }

  //modificar catalogo
  modificarCatalogo(){
    console.log(this.catalogoForm.value);
    const seccion = this.catalogoForm.value.secciones;
   // console.log(seccion);
    
  }
   // Control de las secciones
   addSeccion() {
    this.totalSecciones += 1;
    this.seccionesController();
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
 /* addPropiedad(seccion: number) {
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
          id_tipo_propiedad: ['', Validators.required]
        }));
      }
    }else {
      for(let i = propiedades.length; i >= valor; i--){
        propiedades.removeAt(i);
      }
    }
  }*/

  
   asignarVariable(catalogo:any){
     this.catalogo =catalogo.catalogo;
     console.log(this.catalogo);

   }
}
