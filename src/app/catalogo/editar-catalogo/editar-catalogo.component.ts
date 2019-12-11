import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

//modelos
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType';
import { PropertyType }  from '../../shared/models/propertyType';
import {Catalogues} from '../../shared/models/catalogues';

// Services
import {CatalogoService} from '../catalogo.service';
import { filter } from 'minimatch';
import { tryFunctionOrLogError } from 'apollo-utilities';


declare var M: any;

@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.component.html',
  styleUrls: ['./editar-catalogo.component.css']
})
export class EditarCatalogoComponent implements OnInit {
  public catalogueForm: FormGroup;
  public configurationForm: FormGroup;

  public cataloguesTypes: CatalogueType;
  public propertyTypes: Array<PropertyType>;
  public modalidad: Modalidad;
  public catalogue : Catalogues;
  public municipios: any;
  public localidades: any;
  public hue: string
  public color: string
  public ModalInstance: any;
  public controlconfiguracion : any;
  public municipioID: any;
  public localidadesID: any;


  public configuracionForm : any;
  public showLocalidad : any;
  constructor(
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private router?: Router,
    private route?: ActivatedRoute
  ) {}

  ngOnInit() {
    let id= this.route.snapshot.paramMap.get("id"); 

    this.service.getMunicipios().subscribe(({ data })=>{
      this.municipios = data['municipios']; 
      this.assignMunicipio(this.municipios);
    });

    this.service.getCatalogoType().subscribe(result =>{
      this.cataloguesTypes =result.data['catalogueTypes'];    
    });

    this.service.getPropertyTypes().subscribe(({ data }) =>{
      this.propertyTypes = data['propertyTypes'];
    });

    this.service.catalogueByID((id)).subscribe(({ data })=>{
    this.catalogue = data['catalogue']
      this.service.getLocalidad(this.catalogue.id_localidad).subscribe(({ data })=>{
      this.localidades = data['localidad'];
      
        this.service.getModalidad(this.catalogue.id_modalidad).subscribe(({ data }) =>{
          this.modalidad = data['modalidad'];      
          this.catalogueForm = this.formBuilder.group({
            municipio:[this.localidades.municipio.nombre, Validators.required],
            id_localidad :[this.localidades.nombre,Validators.required],
            id_modalidad: [this.catalogue.id_modalidad, Validators.required],
            id_catalogue_type: [this.catalogue.catalogueType.id, Validators.required],
            name: [this.catalogue.name, Validators.required],
            configuration: new FormArray ([], Validators.required)
          });
    
        // console.log(this.catalogueForm); 
            let catalogueControls= this.catalogueForm.controls  
            let configuracion= catalogueControls.configuration as FormArray;
            console.log("configuracion:", configuracion);
            
        //  this.configuracionForm = configuracion.controls;
        //  console.log(this.configuracionForm);
         
          for (let configuracionSeccion of this.catalogue['configuration']['sections'] ) {
           let secciones= this.formBuilder.group({
            name:[configuracionSeccion.name, Validators.required],
            properties: new FormArray([], Validators.required)
            });  
            
            let propiedadGroup = configuracionSeccion.properties as FormArray;
              for (const propiedad of configuracionSeccion.properties) {
                 console.log(propiedad.name);
                // propiedadGroup.push(this.formBuilder.group({
                //   name: [propiedad.name]
                // }));
             }
            configuracion.push(secciones);
          }      
        });
      });
    });
    var modal = document.getElementById('previewModal');
    this.ModalInstance = M.Modal.init(modal, {});
    $(document).ready(function() {
      $('input#catalogue_name').characterCounter();
    });

  
  }
//  search municipios and  localidades
assignMunicipio(municipios: any){
  this.municipios = municipios;
  var datosMunicipios= new Object();
  datosMunicipios={}
  for (let i = 0; i < this.municipios.length; i++) {
    datosMunicipios[this.municipios[i].nombre]= null;
    $('#autocompleteMunicipio').autocomplete(
    {
      data: datosMunicipios,
      getData: function (value, callback) {
      }
    });
  }
}

searchLocalidadesByMunicipio() {
  let nombreMunicipio= (<HTMLInputElement> document.getElementById('autocompleteMunicipio')).value;
  for (let i = 0; i < this.municipios.length; i++) {
    if(this.municipios[i].nombre== nombreMunicipio){
      this.municipioID= this.municipios[i];
      this.service.getLocalidades(this.municipioID.id).subscribe(({ data })=>{
        this.localidades = data['localidades'];
        if(this.localidades){
          this.showLocalidad = true;
          this.assignLocalidades(this.localidades);
        }else{
          console.log("sin localidadesd");
          
        }
      });
    }
  }
}

assignLocalidades(localidades: any){
  var datosLocalidades= new Object();
  datosLocalidades={}
  for (let i = 0; i < this.localidades.length; i++) {
    datosLocalidades[this.localidades[i].nombre]= null;
  }
  $('#autocompleteLocalidad').autocomplete({
    data: datosLocalidades,
    getData: function (value, callback) {
    }
  });
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
    console.log(this.catalogueForm);

    this.ModalInstance.open();
  }

  onSubmit() {
    //crear Nueva plantilla mediante una planmtilla existente
    let nombreMunicipio= (<HTMLInputElement> document.getElementById('autocompleteMunicipio')).value;
    for (let i = 0; i < this.municipios.length; i++) {
      if(this.municipios[i].nombre== nombreMunicipio){
        this.municipioID= this.municipios[i];
        this.service.getLocalidades(this.municipioID.id).subscribe(({ data })=>{
          this.localidades = data['localidades'];
          let nombreLocalidad= (<HTMLInputElement> document.getElementById('autocompleteLocalidad')).value;
          for (let i = 0; i < this.localidades.length; i++) {
            if(this.localidades[i].nombre == nombreLocalidad){
              this.localidadesID = this.localidades[i];
              this.service.createCatalogue(
                this.modalidad.id,
                this.localidadesID.id,
                this.catalogueForm.value.id_catalogue_type,
                this.catalogueForm.value.name,
                this.catalogueForm.value.configuration
              ).subscribe(({data}) => {
                this.ModalInstance.close();
                this.router.navigate(['/aplicacion/catalogo/modalidad', this.modalidad.id]);
              },(error) => {
                var errores = error.message.split(":");
                var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[1]+'</div></span>';
                M.toast({html: toastHTML});
              });
            }
          }
        });
      }
    }
	}
  closeSeccion(index: any){
    // this.configuration.reset();
    for (let i = this.configuration.length; i >= index; i--) {
      this.configuration.removeAt(index);
    }
  }

}
