import { Component, OnInit, TestabilityRegistry, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Apollo} from 'apollo-angular';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import { CatalogueType } from '../../shared/models/catalogueType'
import { Catalogues } from '../../shared/models/catalogues';

// Services
import {CatalogoService} from '../catalogo.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

declare var M: any;

@Component({
  selector: 'app-crear-catalogo',
  templateUrl: './crear-catalogo.component.html',
  styleUrls: ['./crear-catalogo.component.css'],

})
export class CrearCatalogoComponent implements OnInit {
  public catalogueForm: FormGroup;
  public catalogoTypes : Array<CatalogueType>;
  public modalidades: Array<Modalidad>;
  public catalogues: Array<Catalogues>;
  public seccionesForm: any;
  
  public totalSecciones: number = 0;

  constructor(
    private apollo?: Apollo,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private router?: Router,
    private route?: ActivatedRoute
  ){}

  ngOnInit() { 
    this.service.getCatalogues().subscribe(({data })=>{
      this.catalogues = data['catalogues'];
  
    });
    
    this.service.getCatalogoType().subscribe(result =>{
      this.catalogoTypes = result.data['catalogueTypes'];
      
    });
 
    // this.service.getModalidad(this.route.snapshot.paramMap.get("id")).subscribe(({ data }) =>{
    //   this.modalidades = data['modalidad'];    
    //   console.log("modalidades",this.modalidades);
       
    // });

  
  
    this.catalogueForm = this.formBuilder.group({
      modality:['',Validators.required],
      name_Catalogue:['',Validators.required],
      type_Catalogue:['',Validators.required]
    });

    
  }

  createCatalogue(){

  }
}
