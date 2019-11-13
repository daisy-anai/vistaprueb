import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'semovi-card-header-icon',
  templateUrl: './semovi-card-header-icon.component.html',
  styleUrls: ['./semovi-card-header-icon.component.css']
})
export class SemoviCardHeaderIconComponent {
  @Input() urn: String; 
  @Input() icon: String; 
  @Input()parameter: String;
  constructor(
    private navigate: Location,
    private route: Router
  ) { }

  redirect() {
    if(!this.urn){
      this.navigate.back(); 
    }else{
      this.route.navigate([this.urn]); 
      //this.route.navigate([this.urn, this.parameter])
    }
  }
}
