import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CatalogoService } from '../catalogo.service';

@Component({
  selector: 'app-detalle-catalogo',
  templateUrl: './detalle-catalogo.component.html',
  styleUrls: ['./detalle-catalogo.component.css']
})
export class DetalleCatalogoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service?: CatalogoService
  ) { }

  ngOnInit() {
    console.log();
    this.service.getCatalogoByID(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
      
    })
  }

}
