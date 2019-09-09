import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from "../../core/services/storage.service";
import { MessageService } from '../message.service';
import { User } from "../../core/models/user.model";
import { Concesion } from '../../models/concesion';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  public user: User;
  public concesion: Concesion;

  constructor(
    private router?: Router,
    private messageService?: MessageService,
    private service?: StorageService
  ){
    this.messageService.getConcesion().subscribe(result => {
      this.concesion = result.concesion;
      console.log("Application", this.concesion);
    });
  }

  ngOnInit() {
    this.user = this.service.getCurrentUser();

    $(".dropdown-trigger").dropdown();
    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
  }

  logout(): void{
    this.service.logout();
    this.router.navigate(['/login']);
  }


}
