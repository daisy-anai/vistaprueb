import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../shared/services/storage.service'
import { User } from '../../shared/models/user';
import {ENCRIPT} from "../../../assets/key/encript";
import { Apollo } from 'apollo-angular';

//servicio
import { ResetpasswordService } from '../resetpassword.service';
import { error } from '@angular/compiler/src/util';

declare var M: any;


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public password: string;
  public passwordconf: string;
  valid: boolean = false;
  public user: User;
  constructor(
    private storageService?: StorageService,
    private service?: ResetpasswordService
    ) 
  {}

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
 
  }
  changePassword(){
    var CryptoJS = require("crypto-js");
    let encript = ENCRIPT.HOME_URL;
    var ciphertext = CryptoJS.AES.encrypt(this.password, ENCRIPT.HOME_URL).toString();
    this.service.updatePassword(this.user.id,ciphertext).subscribe(({ data })=>{
      M.toast({html: 'Se ha cambiado la contraseña'});
       this.storageService.logout();
       window.location.href = "/login";
    }, (error)=>{
      var divisiones = error.message.split(":", 2);
      M.toast({html: divisiones[1]})
    });
  }
  validPassword(){
    var pass = (<HTMLInputElement>document.getElementById("password")).value;
     var pass2 = (<HTMLInputElement>document.getElementById("passwordconf")).value;
     if(pass == pass2){
       this.valid = true;
     }else{
       this.valid = false;
     }

  }
}
