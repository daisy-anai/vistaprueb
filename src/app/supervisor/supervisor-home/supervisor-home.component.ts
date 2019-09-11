import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from "../../shared/services/storage.service";
import { User } from "../../shared/models/user.model";
import { Concesion } from '../../models/concesion';
import { Vehiculo } from '../../models/vehiculo';
declare var M: any;

@Component({
  selector: 'app-supervisor-home',
  templateUrl: './supervisor-home.component.html',
  styleUrls: ['./supervisor-home.component.css']
})
export class SupervisorHomeComponent implements OnInit {
  public user: User;
  public concesion: Concesion;
  public vehiculo: Vehiculo;

  constructor(
    private router?: Router,
    private service?: StorageService
  ) { }

  ngOnInit() {
    this.user = this.service.getCurrentUser();

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.dropdown-supervisor');
      var instances = M.Dropdown.init(elems, {
        coverTrigger: false
      });
    });

    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
  }

  logout(): void{
    this.service.logout();
    this.router.navigate(['/login']);
  }

  recibirConcesion($event){
    this.concesion = $event;
    console.log(this.concesion);
  }

  recibirVehiculo($event){
    this.vehiculo = $event;
    console.log($event);
  }
}
