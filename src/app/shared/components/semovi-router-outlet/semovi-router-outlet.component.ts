import { Component, OnInit } from '@angular/core';
import { slideAnimation } from '../transition';

@Component({
  selector: 'semovi-router-outlet',
  templateUrl: './semovi-router-outlet.component.html',
  styleUrls: ['./semovi-router-outlet.component.css'],
  animations: [
    slideAnimation
  ]
})
export class SemoviRouterOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
