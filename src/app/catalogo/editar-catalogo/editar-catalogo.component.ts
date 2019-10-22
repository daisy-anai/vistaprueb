import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
//modelos
import { Modalidad } from '../../shared/models/modalidad';
import { Location } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-editar-catalogo',
  templateUrl: './editar-catalogo.component.html',
  styleUrls: ['./editar-catalogo.component.css']
})
export class EditarCatalogoComponent implements OnInit {
  public catalogo: any;
  public catalogueForm: FormGroup;
  public modalidades: Array<Modalidad>;

  constructor(
    private route: ActivatedRoute,
    private service?: CatalogoService,
    private formBuilder?: FormBuilder,
    private navigate?: Location

  ) {}

  ngOnInit() {
    this.service.getModalidades().subscribe(result => {
      this.modalidades = result.data['modalidades'];
    });

    this.catalogueForm = this.formBuilder.group({
      modality:['',Validators.required],
      name_catalogue:['',Validators.required],
      id_catalogue:['',Validators.required],
      configuration:['',Validators.required]
    });

  }
}
