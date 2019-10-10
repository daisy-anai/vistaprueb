import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

// Service
import { VigenciasService } from '../vigencias.service';

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
    private formBuilder?: FormBuilder,
    private route?: ActivatedRoute,
    private router?: Router
  ){}

  ngOnInit() {
    this.service.vigenciasByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result =>{
      this.vigencia = result.data['vigencia'];        

      this.service.getModalidad(this.vigencia.id_modalidad).subscribe((result)=>{
        this.modalidad = result.data['modalidad']; 
        this.modalidad.vigencia = this.vigencia;   
        this.vigenciaForm = this.formBuilder.group({
          id_modalidad: [this.modalidad.id, Validators.required],
          anios_legales: [this.modalidad.vigencia.anios_legales, Validators.required],
          anios_prorroga: [this.modalidad.vigencia.anios_prorroga, Validators.required]
        });  
      });
    });

    this.service.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];   
      
    });
        
    
  }
  
  modificarVigencia(){
    console.log(this.vigenciaForm.value.id_modalidad);
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    let id_modalidad = this.vigenciaForm.value.id_modalidad
    let anios_legales= this.vigenciaForm.value.anios_legales;
    let anios_prorroga = this.vigenciaForm.value.anios_prorroga;

    this.service.modificarVigencias(id,id_modalidad,anios_legales,anios_prorroga).subscribe(result =>{
      this.router.navigate(['/aplicacion/vigencias/listar']);
     });
  }
}
