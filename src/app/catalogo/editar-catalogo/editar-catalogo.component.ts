import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

//modelos
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType'
import { PropertyType }  from '../../shared/models/propertyType'
import { Municipio } from 'src/app/shared/models/municipio';

// Services
import {CatalogoService} from '../catalogo.service';


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
  public catalogue : any;
  public ex : any;
  public municipios: Municipio;
  public localidades: any;
  public hue: string
  public color: string
  public ModalInstance: any;
  public controlconfiguracion : any;
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
    });
    this.service.getCatalogoType().subscribe(result =>{
      this.cataloguesTypes = result.data['catalogueTypes'];
    });

    this.service.getPropertyTypes().subscribe(({ data }) =>{
      this.propertyTypes = data['propertyTypes'];
    });

    this.service.catalogueByID((id)).subscribe(({ data })=>{
      this.catalogue = data['catalogue']; 
      this.service.getModalidad(this.catalogue.id_modalidad).subscribe(({ data }) =>{
        this.modalidad = data['modalidad']; 

        this.catalogueForm = this.formBuilder.group({
          municipio:[, Validators.required],
          id_localidad :[this.catalogue.id_localidad,Validators.required],
          id_modalidad: [this.catalogue.id_modalidad, Validators.required],
          id_catalogue_type: [this.catalogue.catalogueType.name, Validators.required],
          name: [this.catalogue.name, Validators.required],
          configuration: new FormArray ([], Validators.required)
        });
      

        let catalogueControls= this.catalogueForm.controls  
        let configuracion= catalogueControls.configuration as FormArray;
    
        for (let configuracionS of this.catalogue['configuration'].sections ) {
          configuracion.push(this.formBuilder.group({
            name:[configuracionS.name, Validators.required],
            properties: new FormArray([], Validators.required)
          }));

          let propiedadCatalogue = configuracion['properties'] as  FormArray;
          console.log(propiedadCatalogue);

            
          // for (const propiedad of configuracionS['properties']) {
          //   configuracion.push(this.formBuilder.group({
          //     name: [propiedad.name, Validators.required]
          //   }));
          //   }
        }

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
    this.service.catalogueUpdate(
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
  
  closeSeccion(index: any){
    // this.configuration.reset();
    for (let i = this.configuration.length; i >= index; i--) {
      this.configuration.removeAt(index);
    }
  }
  /**
   *       "id": "MU0003",
        "nombre": "ASUNCION CACALOTEPEC",
        "distrito": {
          "id": "DI0014",
          "nombre": "MIXE",
          "region": {
            "id": "RE0006",
            "nombre": "SIERRA NORTE"
          }
        }
      },
   */
}
