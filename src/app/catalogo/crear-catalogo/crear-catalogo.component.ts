import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Apollo} from 'apollo-angular';


//servicios
import {CatalogoService} from '../catalogo.service';

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css']
})
export class CrearCatalogoComponent implements OnInit {
  public dynamicForm: FormGroup;
  public secciones: any;
  public countSecciones: number = 0; 
  public agregarPropiedad: number = 0;

  constructor(
    private apollo?: Apollo,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder
  ) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      id_modalidad: ['', Validators.required],
      numeroSecciones: ['', Validators.required],
      secciones: new FormArray([])
    });
  }

  incSeccion(){
    this.countSecciones += 1; 
    this.totalSecciones(null); 
  }

  removeSeccion(){
     this.countSecciones -= 1;
     this.totalSecciones(null);
  }

  agregarPropiedades(){
    this.agregarPropiedad+=1;
      this.totalPropiedades(null,null);
  }
  
  totalSecciones(e) {
    let controles = this.dynamicForm.controls;
    let secciones = controles.secciones as FormArray;
    this.secciones = secciones.controls;
    
    if (secciones.length < this.countSecciones) {
      for (let i = secciones.length; i < this.countSecciones; i++) {
        secciones.push(this.formBuilder.group({
          nombreSeccion: ['', Validators.required],
          numeroPropiedades: ['', Validators.required],
          propiedades: new FormArray([]),
          secc: [i]
        }));
      }
    } else {
      for (let i = secciones.length; i >= this.countSecciones; i--) {
        secciones.removeAt(i);
      }
    }
  }

  propiedades(seccion) {        
    return this.secciones[seccion]['controls']['propiedades'] as FormArray;
  }

  
  totalPropiedades(e, seccion){
    let controles = this.secciones[seccion]['controls'];
    let propiedades = controles.propiedades as FormArray;
    if(propiedades.length < this.agregarPropiedad){
      for (let i = propiedades.length; i < this.agregarPropiedad; i++) {
        propiedades.push(this.formBuilder.group({
          nombre: ['', Validators.required],
          tipoValor: ['', Validators.required],
          test: [i]
        }));
      }
    }else {
      for(let i = propiedades.length; i >= this.agregarPropiedad; i--){
        propiedades.removeAt(i);
      }
    }
  }
}

