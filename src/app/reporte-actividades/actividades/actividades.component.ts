import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';

//models
import { User } from '../../shared/models/user';

//service
import { ReporteActividadesService } from '../reporte-actividades.service';
import{ CatalogoService } from '../../catalogo/catalogo.service';

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

  constructor(
    private storageService?: StorageService,
    private service?: ReporteActividadesService,
    private catalogueservice?: CatalogoService  ){}

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
    this.service.historyByCompleteChecksWhereCentroTrabajo(this.user.id_centro_trabajo).subscribe(({ data })=>{
      this.completeChecks = data['historyByCompleteChecksWhereCentroTrabajo'];
      this.complete = this.completeChecks.length;
      // console.log(this.complete);
      // console.log(this.completeChecks);
      

    });
    this.catalogueservice.getModalidades().subscribe(( { data })=>{
      this.modalidades = data['modalidades'];
      // console.log(this.modalidades)
    })
  }

}
