import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Apollo} from 'apollo-angular';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType'
import { Catalogues } from '../../shared/models/catalogues';
import { PropertyType }  from '../../shared/models/propertyType'
import {  Municipio  } from '../../shared/models/municipio';

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
	public configurarcionForm: any;
	public municipios: any;
	public localidades: any;

	public hue: string
	public color: string
	public ModalInstance: any;
	public total: number=0;
	constructor(
		private service?: CatalogoService,
		private formBuilder?: FormBuilder,
		private router?: Router,
		private route?: ActivatedRoute
	){}

	ngOnInit() {
  
		let id_modalidad= this.route.snapshot.paramMap.get("id");
  
        // this.service.getLocalidades(this.municipios.id).subscribe(({ data })=>{
        // this.localidades = data['localidades'];
      //   this.service.getLocalidad(this.localidades.id).subscribe(({ data })=>{
      //     this.localidades = data['localidad'];
      //     console.log(this.localidades);
          
      //    });      
      //  })
  
		this.service.getCatalogoType().subscribe(result =>{
			this.cataloguesTypes = result.data['catalogueTypes'];
		});

		this.service.getModalidad(id_modalidad).subscribe(({ data }) =>{
			this.modalidad = data['modalidad'];
		});

		this.service.getPropertyTypes().subscribe(({ data }) =>{
			this.propertyTypes = data['propertyTypes'];
		});

    this.service.getMunicipios().subscribe(({ data })=>{
      this.municipios = data['municipios'];
    });

		this.catalogueForm = this.formBuilder.group({
      municipio:['', Validators.required],
			id_modalidad: [id_modalidad, Validators.required],
			id_localidad:['111',Validators.required],
			id_catalogue_type: ['', Validators.required],
			name: ['', Validators.required],
			configuration: new FormArray ([], Validators.required)
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
			this.catalogueForm.value.id_localidad,
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

	closeSeccion(index: any){
		// this.configuration.reset();
		for (let i = this.configuration.length; i >= index; i--) {
			this.configuration.removeAt(index);
		}
	}
}
/**
 *    "id": "MU0001",
				"nombre": "ABEJONES",
				"distrito": {
					"id": "DI0012",
					"nombre": "IXTLAN",
					"region": {
						"id": "RE0006",
						"nombre": "SIERRA NORTE"
					}
 */
