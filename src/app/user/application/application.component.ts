import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../core/services/storage.service";
import { User } from "../../core/models/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  public user: User;
  constructor(private router?: Router, private service?: StorageService) { }

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
