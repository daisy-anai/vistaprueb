import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-plantillas-cromatica',
  templateUrl: './plantillas-cromatica.component.html',
  styleUrls: ['./plantillas-cromatica.component.css']
})
export class PlantillasCromaticaComponent implements OnInit {
  public dynamicForm: FormGroup;
  public secciones: any;
  public propiedades: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numeroSecciones: ['', Validators.required],
      secciones: new FormArray([])
    });
  }

  // Secciones
  get form() { return this.dynamicForm.controls; }
  get t() { return this.form.secciones as FormArray; }

  totalSecciones(e) {
    let controles = this.dynamicForm.controls;
    let secciones = controles.secciones as FormArray;
    this.secciones = secciones.controls;

    const valor = e.target.value || 0;
    if (secciones.length < valor) {
      for (let i = secciones.length; i < valor; i++) {
        secciones.push(this.formBuilder.group({
          nombreSeccion: ['', Validators.required],
          numeroPropiedades: ['', Validators.required],
          propiedades: new FormArray([]),
          secc: [i]
        }));
      }
    } else {
      for (let i = secciones.length; i >= valor; i--) {
        secciones.removeAt(i);
      }
    }
  }

  trust(seccion) {
    return this.secciones[seccion]['controls']['propiedades'] as FormArray;
  }

  totalPropiedades(e, seccion){
    let controles = this.secciones[seccion]['controls'];
    let propiedades = controles.propiedades as FormArray;
    this.propiedades = propiedades.controls;

    const valor = e.target.value || 0;

    if(propiedades.length < valor){
      for (let i = propiedades.length; i < valor; i++) {
        propiedades.push(this.formBuilder.group({
          nombre: ['', Validators.required],
          tipoValor: ['', Validators.required],
          test: [i]
        }));
      }
    }else {
      for(let i = propiedades.length; i >= valor; i--){
        propiedades.removeAt(i);
      }
    }

    console.log(this.secciones[seccion]['controls']['propiedades']['controls']);

  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      return;
    }
  }
}
