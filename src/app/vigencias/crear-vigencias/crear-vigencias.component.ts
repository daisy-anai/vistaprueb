import { Component, OnInit } from '@angular/core';
import { VigenciasService } from '../vigencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Service
import { CatalogoService } from '../../catalogo/catalogo.service';

// Models
import { Modalidad } from '../../shared/models/modalidad';
import {Vigencia } from '../../shared/models/vigencia';
declare var M: any;


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
    })
    this.catalogoForm = this.formBuilder.group({
      id_modalidad: [modalidadID, Validators.required],
      anios_legales: [1, [Validators.required, Validators.min(1),Validators.max(20)]],
      anios_prorroga: [, [Validators.required, Validators.min(0), Validators.max(10)]]
    });

  }
  
  /**
    @description Crear Vigencia Mutation
    @param crearVigencia
  */
 
  crearVigencia(){
    const id_modalidad = this.catalogoForm.value.id_modalidad;
    const legal_years= this.catalogoForm.value.anios_legales;
    const extension_years= this.catalogoForm.value.anios_prorroga;
    this.service.createVigencia(id_modalidad,legal_years,extension_years).subscribe((result)  => {
      this.router.navigate([`/aplicacion/vigencias/modalidad/${id_modalidad}`])  
    },(error) => {
      var errores = error.message.split(":");
      var toastHTML = '<span> <div class="valign-wrapper"><i class="material-icons">error_outline</i>  &nbsp;&nbsp;'+errores[1]+'</div></span>';
      M.toast({html: toastHTML});
    });
  }
 
}
