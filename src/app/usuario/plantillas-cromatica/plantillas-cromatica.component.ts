import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const mutacion= gql`
    mutation CreateCatalogo($id_modalidad:ID!, $nombre:String!, $plantilla:[SeccionesInput!]!){
      catalogo(id_modalidad:$id_modalidad, nombre:$nombre, plantilla:$plantilla){
        id
        nombre
        estatus
        createdAt
        modalidad {
          id
          nombre
          descripcion
          estatus
          abreviatura
        }
        secciones {
          id
          nombre
          propiedades {
            id
            nombre
            tipo {
              id
              nombre
              estatus
              createdAt
            }
          }
          estatus
          createdAt
        }
      }
    }`;

@Component({
  selector: 'app-plantillas-cromatica',
  templateUrl: './plantillas-cromatica.component.html',
  styleUrls: ['./plantillas-cromatica.component.css']
})
export class PlantillasCromaticaComponent implements OnInit {
  public dynamicForm: FormGroup;
  public secciones: any;
  public variableacambiar: boolean = false;
  public modalidades : Array<any>;
  public moda: any; 
  modalidad: any;

  constructor(private formBuilder: FormBuilder, private apollo:Apollo) { }

  
  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      id_modalidad: ['', Validators.required],
      numeroSecciones: ['', Validators.required],
      secciones: new FormArray([])
    });

    //query modalidades
    this.apollo.use('sicac').watchQuery({
      query: gql`
      query modalidades {
        modalidades {
          id
          nombre
        }
      }
      `
    }).valueChanges.subscribe(result => {
     this.mostrarModalidades(result.data);
    });
  }
  mostrarModalidades(data: any){
    this.modalidades=data.modalidades;
    console.log(this.modalidades);
   
  }
  asignarPlantilla(data:any){
    console.log(data);
  }
  

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

  propiedades(seccion) {
    return this.secciones[seccion]['controls']['propiedades'] as FormArray;
  }

  totalPropiedades(e, seccion){
    let controles = this.secciones[seccion]['controls'];
    let propiedades = controles.propiedades as FormArray;

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
  }
  onSubmit() {

    // console.log(this.dynamicForm.controls['secciones']['controls'][0]);
    // if (this.dynamicForm.invalid) {
    //   return  console.log( this.secciones) ;
    // } 
    this.apollo.use('backrevista').mutate({
      mutation: mutacion,
      variables:{
        id_modalidad: this.modalidad,
        nombre:'TAXI tipo x',
        plantilla:[{ 
          nombre:"PINTURA DE LA UNIIDAD",
          propiedades: [
            {
              nombre: "Toldo",
              tipo: 2
            }
          ]
        }
        ]
      }
    }).subscribe(({data})=>{
      this.asignarPlantilla(data);   
    },(error) =>{
      console.log("error",error);     
    });
  }

  previsualizar(){  
   console.log(this.dynamicForm);  
  }

  asignarmodalidad(modalidad: any){
    console.log(modalidad);
  }


  vermodalidad(){
    console.log(this.modalidad); 


  }

}
