import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-plantillas-cromatica',
  templateUrl: './plantillas-cromatica.component.html',
  styleUrls: ['./plantillas-cromatica.component.css']
})
export class PlantillasCromaticaComponent implements OnInit {
  public dynamicForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numeroSecciones: ['', Validators.required],
      secciones: new FormArray([])
    });
  }

  // Secciones
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.secciones as FormArray; }

  totalSecciones(e) {
    const secciones = e.target.value || 0;
    if (this.t.length < secciones) {
      for (let i = this.t.length; i < secciones; i++) {
        this.t.push(this.formBuilder.group({
          nombreSeccion: ['', Validators.required],
          numeroPropiedades: ['', Validators.required],
          propiedades: new FormArray([])
        }));
      }
    } else {
      for (let i = this.t.length; i >= secciones; i--) {
          this.t.removeAt(i);
      }
    }
  }

  // Subsecciones
  a(seccion) { return this.t.controls[seccion].controls; }
  b(seccion) { return this.a(seccion).propiedades as FormArray }

  totalPropiedades(e, seccion){
    const propiedades = e.target.value || 0;

    if(this.b(seccion).length < propiedades){
      for (let i = this.b(seccion).length; i < propiedades; i++) {
        console.log("Tst");
        this.b(seccion).push(this.formBuilder.group({
          nombre: ['', Validators.required],
          tipoValor: ['', Validators.required]
        }));
      }
    }else {
      for(let i = this.b(seccion).length; i >= propiedades; i--){
        this.b(seccion).removeAt(i);
      }
    }
  }

  onSubmit() {
    if (this.dynamicForm.invalid) {
      return;
    }
  }
}
