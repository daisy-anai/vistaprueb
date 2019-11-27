  import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType'
import { PropertyType }  from '../../shared/models/propertyType'


// Services
import {CatalogoService} from '../catalogo.service';

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
  public municipios: any;
  public municipioID: any;
  public localidadesID: any;
  public localidades: any;
  public localidad: any;
  public nameproperty: any

  public localidadName: string='';
  public newPropertyName: string ='';
  public nameMunicipio: string = '';
  public namecatalogueType: string='';
  public description: string='';
  public type: string  = 'texto';
	public hue: string
  public color: string
  
  public ModalInstance: any;
  public autocompleteInstance: any;
  public ModalInstanceAdd: any;
  public ModalInstanceProperty: any

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
		this.service.getModalidad(id_modalidad).subscribe(({ data }) =>{
      this.modalidad = data['modalidad'];
     
    });
    

    $(document).ready(function() {
      $('input#catalogue_name').characterCounter();
    });

		this.service.getPropertyTypes().subscribe(({ data }) =>{
      this.propertyTypes = data['propertyTypes'];
    });
    this.service.getCatalogoType().subscribe(({ data})=>{
      this.cataloguesTypes = data['catalogueTypes'];      
    })

       
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

    var modalAdd = document.getElementById('addCatalogueType');
		this.ModalInstanceAdd = M.Modal.init(modalAdd, {
      dismissible:false
    });
    var modalProperty= document.getElementById('addCatalogueProperty');
    this.ModalInstanceProperty = M.Modal.init(modalProperty,{
      dismissible: false
    });
  } 
    //catalogue type
  newCatalogueType(){
    this.service.createCatalogueType(this.namecatalogueType, this.description).subscribe(({ data })=>{
      this.cataloguesTypes = data['catalogueType'];
    this.listCatalogueType();
    });

    this.namecatalogueType='';
    this.description='';
  }
  listCatalogueType(){
    this.cataloguesTypes=[];
    this.service.getCatalogoType().subscribe(({data})=>{
      this.cataloguesTypes = data['catalogueTypes'];   
    });
  }
  openModalType(){
    this.ModalInstanceAdd.open();
  }
  cancelarModaltype(){
    this.namecatalogueType='';
    this.description='';
  }
  setCataloguesTypesName(nameProperty: any){
  [this.nameproperty] = this.cataloguesTypes.filter(e =>e.id ===nameProperty);
  
  }
  //catalogue property
  newProperty(){
    this.ModalInstanceProperty.open();
  }
  createPropetyType(){
    this.service.propertyType(this.newPropertyName).subscribe(({ data })=>{
      this.propertyTypes = data['propertyType'];
      this.listCatalogueProperty();
    });
    this.newPropertyName='';
  }
  listCatalogueProperty(){
    this.propertyTypes=[];
    this.service.getPropertyTypes().subscribe(({ data }) =>{
      this.propertyTypes = data['propertyTypes'];
    });
  }
  cancelarModalProperty(){
    this.newPropertyName='';
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
              this.service.createCatalogue(
                this.modalidad.id,
                this.localidadesID.id,
                this.catalogueForm.value.id_catalogue_type,
                this.catalogueForm.value.name,
                this.catalogueForm.value.configuration
              ).subscribe(({data}) => {
                this.router.navigate(['/aplicacion/catalogo/modalidad', this.modalidad.id]);
                // window.location.reload(false); 
                console.log("dss");
                
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
