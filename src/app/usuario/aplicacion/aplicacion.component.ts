import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from "../../shared/services/storage.service";
import { MediumDataService } from '../../shared/services/medium.data.service';

import { User } from "../../shared/models/user.model";
import { Concesion } from '../../shared/models/concesion';
import { Vehiculo } from '../../shared/models/vehiculo';
declare var M: any;

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  public user: User;
  public concesion: Concesion;
  public vehiculo: Vehiculo;

  constructor(
    private router?: Router,
    private session?: StorageService,
    private medium?: MediumDataService
  ) {}

  ngOnInit() {
    this.user = this.session.getCurrentUser();

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
      coverTrigger: false
    });

    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
  }

  logout(): void{
    this.session.logout();
    this.router.navigate(['/login']);
  }

  recibirConcesion($event){
    this.concesion = $event;
    this.medium.setConcesion($event);
    console.log(this.concesion);
  }

  recibirVehiculo($event){
    this.vehiculo = $event;
    this.medium.setVehiculo($event);
    console.log($event);
  }
}
