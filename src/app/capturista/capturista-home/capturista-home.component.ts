import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from "../../shared/services/storage.service";
import { User } from "../../shared/models/user.model";

@Component({
  selector: 'app-capturista-home',
  templateUrl: './capturista-home.component.html',
  styleUrls: ['./capturista-home.component.css']
})
export class CapturistaHomeComponent implements OnInit {
  public user: User;

  constructor(
    private router?: Router,
    private service?: StorageService
  ) {}

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
