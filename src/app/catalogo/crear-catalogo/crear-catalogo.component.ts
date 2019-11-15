  import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType'
import { PropertyType }  from '../../shared/models/propertyType'
import { Municipio } from 'src/app/shared/models/municipio';


// Services
import {CatalogoService} from '../catalogo.service';
import { element } from 'protractor';

declare var M: any;

@Component({
	selector: 'app-crear-catalogo',
	templateUrl: './crear-catalogo.component.html',
	styleUrls: ['./crear-catalogo.component.css'],
})
export class CrearCatalogoComponent implements OnInit {
	public catalogueForm: FormGroup;
	public configurationForm: FormGroup;

	public cataloguesTypes: Array<CatalogueType>;
	public propertyTypes: Array<PropertyType>;
  public modalidad: Modalidad;
  public localidadName: string='';
  public municipios: any;
  public municipioID: any;
  public localidadesID: any;
  public localidades: any;
  public localidad: any;
  public nameproperty: any
  
  public nameMunicipio: string = '';
	public hue: string
	public color: string
  public ModalInstance: any;
  public autocompleteInstance: any;

	constructor(
		private service?: CatalogoService,
		private formBuilder?: FormBuilder,
		private route?: ActivatedRoute,
    private router?: Router
	){}

	ngOnInit() {   

    let id_modalidad= this.route.snapshot.paramMap.get("id");

    this.service.getMunicipios().subscribe(({ data })=>{
      this.municipios = data['municipios']; 
      this.assignMunicipio(this.municipios);
    });
  
      
		this.service.getCatalogoType().subscribe(result =>{
      this.cataloguesTypes = result.data['catalogueTypes'];
		});

		this.service.getModalidad(id_modalidad).subscribe(({ data }) =>{
      this.modalidad = data['modalidad'];
     
		});

		this.service.getPropertyTypes().subscribe(({ data }) =>{
			this.propertyTypes = data['propertyTypes'];
    });
       
    this.catalogueForm = this.formBuilder.group({
      municipio:['', Validators.required],
      id_localidad:['',Validators.required],
      id_modalidad: [id_modalidad, Validators.required],
      id_catalogue_type: ['', Validators.required],
      name: ['', Validators.required],
      configuration: new FormArray ([], Validators.required)
    });
  
	
		var modal = document.getElementById('previewModal');
    this.ModalInstance = M.Modal.init(modal, {});

  } 
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
          this.assignLocalidades(this.localidades);
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

  setCataloguesTypesName(nameProperty: any){
    [this.nameproperty] = this.cataloguesTypes.filter(e =>e.id ===nameProperty);
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

	removeSeccion(index: number){
		// this.configuration.reset();
		var dato = this.configuration.value;
			if (index > -1) {
        this.configuration.controls.splice(index, 1);
   		}
	}

	addProperty(sectionObject: any){
		let section = sectionObject.get('properties') as FormArray;
		section.push(this.formBuilder.group({
			name: ['', Validators.required],
			propertyType: ['', Validators.required],
			value: ['', Validators.required]
		}));
	}

	removeProperty(section : any, index : number){
    let properties = this.properties(section);      
    setTimeout(function(){
      properties.controls.splice(index, 1);      
    }, 0);

    // console.log(this.configuration.controls);    
    // if(index >- 1){
    //   properties.splice(index,1);  
    // } 
    // console.log(properties);
    
    
    // console.log("propiedad", properties, "index", index)
    // for (let i = properties.length;  i >= index ; i--) {
    //  properties.splice(i,1);
    // }
	} 

  onPreview() { 

    console.log(this.catalogueForm);
 
		this.ModalInstance.open();
  }


	onSubmit() {
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
              this.service.createCatalogue(this.modalidad.id,
                this.localidadesID.id,
                this.catalogueForm.value.id_catalogue_type,
                this.catalogueForm.value.name,
                this.catalogueForm.value.configuration
              ).subscribe(({data}) => {
                this.router.navigate(['/aplicacion/catalogo/detalle', data['catalogue'].id]);
              }, (error) => {
                console.log("Error", error)
              });
            }

          }
        });
      }
    }   
	}
}
