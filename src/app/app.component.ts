import { Component, OnInit} from '@angular/core';
import {StorageService} from "./shared/services/storage.service";
import {User} from "./shared/models/user.model";

declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 title = 'Expedientes';
 public user: User;
 loged: boolean = false;

  constructor(
     private storageService: StorageService
  ) { }


  ngOnInit() {
     this.user = this.storageService.getCurrentUser();
      if(this.user == null){
       this.loged = false;
     }else{
       this.loged = true;
     }



    $(".dropdown-trigger").dropdown();

      $(document).ready(function(){
        $('.sidenav').sidenav();
      });
  }


  mandarmenu(){
    var elem= document.querySelector('.modal');
  var instance = M.Sidenav.getInstance(elem);
    instance.open();
  }

  public logout(): void{

    this.storageService.logout();
    window.location.href = "/";

  }
}
