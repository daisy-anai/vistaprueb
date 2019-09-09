import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from "../../core/services/storage.service";
import { User } from "../../core/models/user.model";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  public user: User;

  constructor(private router?: Router, private service?: StorageService){}

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
  
  archivo(file: File) {
    var reader = new FileReader();
    reader.onload = () => {
      //  console.log(reader.result);
    };
    reader.readAsText(file);
  }
 
}
