import { Component, OnInit } from '@angular/core';
import { VigenciasService } from '../vigencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Service
import { CatalogoService } from '../../catalogo/catalogo.service';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import {Vigencia } from '../../shared/models/vigencia';


@Component({
  selector: 'app-crear-vigencias',
  templateUrl: './crear-vigencias.component.html',
  styleUrls: ['./crear-vigencias.component.css']
})
export class CrearVigenciasComponent implements OnInit {
  public catalogoForm: FormGroup;
  public modalidades: Array<Modalidad>;
  public modalidad: Modalidad;
  public vigencia : Vigencia;
  constructor(
    private service?: VigenciasService,
    private formBuilder?: FormBuilder,
    private serviceCatalogo ?: CatalogoService,
    private router ?: Router,
    private route?: ActivatedRoute
  ){}

  ngOnInit() {
    let modalidadID=this.route.snapshot.paramMap.get("id");
    this.serviceCatalogo.getModalidad(modalidadID).subscribe(( {data})=>{
      this.modalidad= data['modalidad'];
      console.log(this.modalidades);
      
    })
    this.catalogoForm = this.formBuilder.group({
      id_modalidad: [modalidadID, Validators.required],
      anios_legales: [1, [Validators.required, Validators.min(1)]],
      anios_prorroga: [, [Validators.required, Validators.min(0)]]
    });
  }
  
  /**
    @description Crear Vigencia Mutation
    @param crearVigencia
  */
 
  crearVigencia(){
    console.log(this.catalogoForm.value);
    const id_modalidad = this.catalogoForm.value.id_modalidad;
    const legal_years= this.catalogoForm.value.anios_legales;
    const extension_years= this.catalogoForm.value.anios_prorroga;
    
    this.service.createVigencia(id_modalidad,legal_years,extension_years).subscribe((result)  => {
      this.router.navigate(['aplicacion/vigencias/'])  
    }, (error) => {
        console.log(error);
    });
  }
 
}
