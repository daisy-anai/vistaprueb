import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../../environments/environment';


// Services
import { StorageService } from "../../shared/services/storage.service";
import { User } from "../../shared/models/user";

declare var M: any;

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit, OnDestroy {
  public user: User;

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
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

    // This module is for ws.revista access with tokens
    this.apollo.createNamed('backrevista', {
      link: this.httpLink.create({
       uri: environment.URIBackRevista,
       headers: new HttpHeaders({
         authorization: `Bearer ${this.session.getCurrentToken()}`
       })
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
       watchQuery: {
         fetchPolicy: 'no-cache',
         errorPolicy: 'ignore'
       }
      }
    });


  }

  logout(): void{
    this.session.logout();
    this.router.navigate(['/login']);
  }

  changePassword(){
    this.router.navigate(['/aplicacion/usuario/'])
  }

  ngOnDestroy() {
    this.apollo.removeClient('backrevista');
  }
}
