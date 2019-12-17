import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

//models
import { User } from '../../shared/models/user';

//service
import { ReporteActividadesService } from '../reporte-actividades.service';
import { CatalogoService } from '../../catalogo/catalogo.service';

declare var M;

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  public user: User;
  public completeChecks: any;
  public incompleteChecks: any;
  public modalidades : any;
  public complete: string = '';
  public incomplete: string = '';
  public completeHistory: string;
  public incompleteHisyory:string;
  public idCompleteChecks: string = '';
  public idComleteChecksHistory: string;
  public idIncompleteChecks: string = '';
  public idIncomleteChecksHistory: string;
d
  public fromDate: string;
  public toDate: string;
  public reporte : boolean= false;
  public validate: boolean= true;
  public modalPDF: any;
  public from: any;
  public to: any;
  public finalizar:  boolean= false;
  public close: boolean = true;

  constructor(
    private storageService?: StorageService,
    private service?: ReporteActividadesService,
    private catalogueservice?: CatalogoService,
    private router?: Router,
  

    ){}

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();

    var modalPreview = document.getElementById('download');
    this.modalPDF= M.Modal.init(modalPreview,{
      dismissible:false
    });

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
    format: 'yyyy-mm-dd',
    });

    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // });
 
  }

  downloandReporte(){
    this.from= (<HTMLInputElement>document.getElementById("from")).value;    
    this.to= (<HTMLInputElement>document.getElementById("toDate")).value;    
    this.fromDate = this.from;
    this.toDate = this.to;
    this.modalPDF.open();
  }
  generarPDF(){
    this.close = false;
    this.reporte =true;
    this.finalizar= true;
  }
  cancelar(){
  
    (<HTMLInputElement>document.getElementById("from")).value = '';
    (<HTMLInputElement>document.getElementById("toDate")).value= '';
  }

  finalizarReporte(){
    this.modalPDF.close();
    this.router.navigate(['/aplicacion/concesion']);
    
  }
  showdates(){
    (<HTMLInputElement>document.getElementById("from")).value;

  }
}
