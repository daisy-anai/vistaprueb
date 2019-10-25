import { Component, OnInit, TestabilityRegistry, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Apollo} from 'apollo-angular';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType'
import { Catalogues } from '../../shared/models/catalogues';
import { PropertyType }  from '../../shared/models/propertyType'
// Services
import {CatalogoService} from '../catalogo.service';
declare const MStepper: any;


@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css'],
})
export class CrearCatalogoComponent implements OnInit {
  public catalogueForm: FormGroup;
  public configurationForm: FormGroup;

  // public configuration: Array<any>;
  public catalogoTypes: Array<CatalogueType>;
  public modalidad: Array<Modalidad>;
  public catalogues: Array<Catalogues>;
  public configurarcionForm: any;
  constructor(
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private router?: Router,
    private route?: ActivatedRoute
  ){}

  ngOnInit() { 
 
    let id_modalidad= this.route.snapshot.paramMap.get("id");

    this.service.getCatalogues().subscribe(({data })=>{
      this.catalogues = data['catalogues'];
    });
    
    this.service.getCatalogoType().subscribe(result =>{
      this.catalogoTypes = result.data['catalogueTypes'];
    });

    this.service.getModalidad(id_modalidad).subscribe(({ data }) =>{
      this.modalidad = data['modalidad'];      
      console.log(this.modalidad);
      
    });


    this.catalogueForm = this.formBuilder.group({
      id_modalidad:[id_modalidad,Validators.required],
      name_catalogue:['',Validators.required],
      id_catalogue: ['', Validators.required],
      seccion: new FormArray ([], Validators.required)
      // configuration: this.formBuilder.array([]),
    }); 

  }

  createCatalogue(){
    console.log(this.catalogueForm);
    
    let id_modalidad = this.catalogueForm.value.id_modalidad;
    let id_catalogue =  this.catalogueForm.value.name_catalogue;
    let name =  this.catalogueForm.value.name;
    let configuration = this.catalogueForm.value.configuration;
  
    // this.service.createdCatalogue(id_modalidad,id_catalogue,name,configuration).subscribe(({ data })=>{
    //   this.catalogues = data['catalogue'];
    // }); 
  }

  addSeccion(){

    let seccion= this.catalogueForm.controls.seccion as FormArray;
    seccion.push(this.formBuilder.group({
      seccionName:['', Validators.required],
      propiedad:new FormArray([], Validators.required)
    }));

  }
  propiedadesForm(){

    let controles = this.configurarcionForm;
    let propiedades = controles.propiedad as FormArray;
    let properties = this.catalogueForm.controls

  }
  addPropiedad(){
    
  }

}
