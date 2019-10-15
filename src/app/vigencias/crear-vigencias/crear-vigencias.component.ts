import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { VigenciasService } from '../vigencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service
import { CatalogoService } from '../../catalogo/catalogo.service';

// Models
import { Modalidad } from '../../shared/models/modalidad';

@Component({
  selector: 'app-crear-vigencias',
  templateUrl: './crear-vigencias.component.html',
  styleUrls: ['./crear-vigencias.component.css']
})
export class CrearVigenciasComponent implements OnInit {
  public catalogoForm: FormGroup;
  public modalidades: Array<Modalidad>;

  constructor(
    private service?: VigenciasService,
    private formBuilder?: FormBuilder,
    private serviceCatalogo ?: CatalogoService
  ){}

  ngOnInit() {
    this.serviceCatalogo.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
    });

    this.catalogoForm = this.formBuilder.group({
      id_modalidad: ['', Validators.required],
      anios_legales: [1, [Validators.required, Validators.min(1)]],
      anios_prorroga: [0, [Validators.required, Validators.min(0)]]
    });
  }
  
  /**
    @description Crear Vigencia Mutation
    @param crearVigencia
  */
 
  crearVigencia(){
    console.log(this.catalogoForm.value);
    const id_modalidad = this.catalogoForm.value.id_modalidad;
    const anios_legales= this.catalogoForm.value.anios_legales;
    const anios_prorroga= this.catalogoForm.value.anios_prorroga;
   
    this.service.createVigencia(id_modalidad,anios_legales,anios_prorroga).subscribe((result)  => {
     console.log("vigencia creada ");     
    }, (error) => {
        console.log(error);
    });
  }
 
}
