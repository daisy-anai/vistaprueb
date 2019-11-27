import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { StorageService } from "../../shared/services/storage.service";
import { User } from "../../shared/models/user";

declare var M: any;

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {
  public user: User;

  constructor(
    private router?: Router,
    private session?: StorageService
  ) {}

  ngOnInit() {
    this.user = this.session.getCurrentUser();

    var elems = document.querySelectorAll('.dropdown-menu');
    var instances = M.Dropdown.init(elems, {
      alignment: 'left',
      constrainWidth: true,
      coverTrigger: false,
      closeOnClick: true
    });

    $('.sidenav').sidenav().on('click tap', 'li a', () => {
        $('.sidenav').sidenav('close');
    });

  }

  logout(): void{
    this.session.logout();
    this.router.navigate(['/login']);
  }
  changePassword(){
    this.router.navigate(['/aplicacion/usuario/'])
  }
}
