import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

// Service
import { VigenciasService } from '../vigencias.service';
import { CatalogoService} from '../../catalogo/catalogo.service'

// Models
import { Modalidad } from '../../shared/models/modalidad';
import {Vigencia } from '../../shared/models/vigencia';

@Component({
  selector: 'app-modificar-vigencias',
  templateUrl: './modificar-vigencias.component.html',
  styleUrls: ['./modificar-vigencias.component.css']
})
export class ModificarVigenciasComponent implements OnInit {
  public vigenciaForm: FormGroup;
  public vigencia : Vigencia;
  public modalidad: Modalidad;
  public modalidades : Array<Modalidad>;

  constructor(
    private service?:VigenciasService,
    private catalogoService ?: CatalogoService,
    private formBuilder?: FormBuilder,
    private route?: ActivatedRoute,
    private router?: Router
  ){}

  ngOnInit() {
    this.service.vigenciasByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result =>{
      this.vigencia = result.data['validity'];        
      console.log(this.vigencia.id_modalidad);
      
      this.catalogoService.getModalidad(this.vigencia.id_modalidad).subscribe((result)=>{
        this.modalidad = result.data['modalidad']; 
        this.modalidad.vigencia = this.vigencia;   
        this.vigenciaForm = this.formBuilder.group({
          id_modalidad: [this.modalidad.id, Validators.required],
          anios_legales: [this.modalidad.vigencia.legal_years, Validators.required],
          anios_prorroga: [this.modalidad.vigencia.extension_years, Validators.required]
        
        });
        console.log(this.vigenciaForm);
          
      });
    });

    this.catalogoService.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];         
    });         
  }
  
  /**
    @description Modificar Vigencia
    @param modificarVigencia
  */

  modificarVigencia(){
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    let id_modalidad = this.vigenciaForm.value.id_modalidad
    let legal_years= this.vigenciaForm.value.anios_legales;
    let extension_years = this.vigenciaForm.value.anios_prorroga;
    this.service.updateVigencias(id,id_modalidad,legal_years,extension_years).subscribe(result =>{
      this.router.navigate(['/aplicacion/vigencias/listar']);
     });
  }
}
