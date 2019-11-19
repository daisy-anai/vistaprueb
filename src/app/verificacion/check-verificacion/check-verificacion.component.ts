import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//service
import { CatalogoService } from '../../catalogo/catalogo.service';
@Component({
  selector: 'app-check-verificacion',
  templateUrl: './check-verificacion.component.html',
  styleUrls: ['./check-verificacion.component.css']
})
export class CheckVerificacionComponent implements OnInit {
  public catalogueID :string;
  private catalogues: any;
  public type: string = 'texto'; 
  
  constructor(
    private route?: ActivatedRoute,
    private catalogueService?: CatalogoService
  ) {}

  ngOnInit() {
    this.catalogueID= this.route.snapshot.paramMap.get('id');
   this.catalogueService.catalogueByID( this.route.snapshot.paramMap.get("id")).subscribe(({ data })=>{
      this.catalogues = data['catalogue']; 
      console.log(this.catalogues);
       
   });  
  }

}
