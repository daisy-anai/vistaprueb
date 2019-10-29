import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
//modelos
import { Modalidad } from '../../shared/models/modalidad';
import { Location } from '@angular/common';
import { CatalogueType } from '../../shared/models/catalogueType'
import { Catalogues } from '../../shared/models/catalogues';
import { PropertyType }  from '../../shared/models/propertyType'
// Services
import {CatalogoService} from '../catalogo.service';
import { runInThisContext } from 'vm';


declare var M: any;

@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.component.html',
  styleUrls: ['./editar-catalogo.component.css']
})
export class EditarCatalogoComponent implements OnInit {
  public catalogueForm: FormGroup;
  public configurationForm: FormGroup;

  public cataloguesTypes: Array<CatalogueType>;
  public propertyTypes: Array<PropertyType>;
  public modalidad: Modalidad;
  public configurarcionForm: any;
  public catalogo: Array<Catalogues>;
  public hue: string
  public color: string
  public ModalInstance: any;
   public catalogue : any;
  constructor(
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private router?: Router,
    private route?: ActivatedRoute

  ) {}

  ngOnInit() {
    let id= this.route.snapshot.paramMap.get("id");
      console.log(id);
      
    this.service.getCatalogoType().subscribe(result =>{
      this.cataloguesTypes = result.data['catalogueTypes'];
    });

    this.service.getPropertyTypes().subscribe(({ data }) =>{
      this.propertyTypes = data['propertyTypes'];
    });

    this.service.catalogueByID(parseInt(id)).subscribe(({ data })=>{
      this.catalogue = data['catalogue'];
        this.service.getModalidad(this.catalogue.id_modalidad).subscribe(({ data }) =>{
          this.modalidad = data['modalidad'];
             
        this.catalogueForm = this.formBuilder.group({
          id_modalidad: [this.catalogue.id_modalidad, Validators.required],
          id_catalogue_type: [this.catalogue.catalogueType.name, Validators.required],
          name: [this.catalogue.name, Validators.required],
          configuration: new FormArray ([], Validators.required)
        });
        console.log(this.catalogueForm);
      });       
    });
  
    var modal = document.getElementById('previewModal');
    this.ModalInstance = M.Modal.init(modal, {});
  }

  get configuration(): FormArray {
    return this.catalogueForm.get('configuration') as FormArray;
  }

  properties(sectionObject: any): FormArray {
    return sectionObject.get('properties') as FormArray;
  }

  onChangePropertyType(sectionIndex: number, propertyIndex: number){
    let name = `S[${sectionIndex}]-P[${propertyIndex}]-propertyType`;
    let element = (<HTMLInputElement>document.getElementById(name));
    return element.value;
  }

  addSection(){
    let configuration = this.configuration.push(this.formBuilder.group({
      name:['', Validators.required],
      properties: new FormArray([], Validators.required)
    }));
  }

  addProperty(sectionObject: any){
    let section = sectionObject.get('properties') as FormArray;
    section.push(this.formBuilder.group({
      name: ['', Validators.required],
      propertyType: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }
  onPreview() {
    this.ModalInstance.open();
  }
  onSubmit() {
    this.service.createCatalogue(
      this.modalidad.id,
      this.catalogueForm.value.id_catalogue_type,
      this.catalogueForm.value.name,
      this.catalogueForm.value.configuration
    ).subscribe(({data}) => {
      console.log("(Please hidden me) Result:: ", data);
      this.router.navigate(['/aplicacion/catalogo/detalle', data['catalogue'].id]);
    }, (error) => {
      console.log("Error", error)
    });
  }
}
