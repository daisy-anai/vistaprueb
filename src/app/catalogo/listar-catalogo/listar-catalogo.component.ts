import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Servicios
import { CatalogoService } from '../catalogo.service';
import { VigenciasService } from '../../vigencias/vigencias.service'

@Component({
  selector: 'app-listar-catalogo',
  templateUrl: './listar-catalogo.component.html',
  styleUrls: ['./listar-catalogo.component.css']
})
export class ListarCatalogoComponent implements OnInit {
  private modalidadID: string; 
  private options: Array<{}>;  
  public catalogos: Array<any>;
  public filtro: string;

  constructor (
    private service?: CatalogoService,
    private vigenciasService ?: VigenciasService,
    private route?: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.modalidadID = this.route.snapshot.paramMap.get("id"); 
    
    this.options = [
      {icon: 'add', description: 'Agregar catálogo', urn: '/aplicacion/catalogo/crear' },
      {icon: 'list', description: 'Vigencias', urn: `/aplicacion/vigencias/modalidad/${this.modalidadID}`}
    ]; 

    if(this.route.snapshot.paramMap.get("id")){
      this.service.getCatalogosByModalidad(this.modalidadID).subscribe(({data}) => {
        this.catalogos = data['catalogos'];
      })
    }else {
      this.service.getCatalogos().subscribe(({data, loading}) => {
        this.catalogos = data['catalogos'];
      });
    }

  
  }
}
