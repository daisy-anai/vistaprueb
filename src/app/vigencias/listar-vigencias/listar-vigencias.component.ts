import { Component, OnInit } from '@angular/core';

//Service
 import {VigenciasService } from '../vigencias.service';
 import { CatalogoService } from '../../catalogo/catalogo.service';


// Models
import { Modalidad } from '../../shared/models/modalidad';
import { Vigencias } from '../../shared/models/vigencias';


@Component({
  selector: 'app-listar-vigencias',
  templateUrl: './listar-vigencias.component.html',
  styleUrls: ['./listar-vigencias.component.css']
})
export class ListarVigenciasComponent implements OnInit {
  public modalidades: Array<Modalidad>;

  constructor(
    private service ?: VigenciasService,
    private serviceCatalogo ?: CatalogoService
 
  ) {}

  ngOnInit() {

    this.serviceCatalogo.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
      for (let modalidad of this.modalidades) {
        this.service.getVigenciasModalidadByID(modalidad.id).subscribe(result =>{
          console.log("Modalidad", modalidad.nombre, "vigencia", result.data['vigenciaByModalidad']);  
          modalidad.vigencia = result.data['vigenciaByModalidad'];
        
          

        });
      }
    });

    
  
  }
}
