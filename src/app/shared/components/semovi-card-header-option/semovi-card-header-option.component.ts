import { Component, Input, OnInit } from '@angular/core';

declare var M; 

@Component({
  selector: 'semovi-card-header-option',
  templateUrl: './semovi-card-header-option.component.html',
  styleUrls: ['./semovi-card-header-option.component.css']
})
export class SemoviCardHeaderOptionComponent implements OnInit {
  @Input() options: Array<[{
    icon: String,
    description: String,
    urn: String
  }]>; 

  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.dropdown-header-options');
    var instances = M.Dropdown.init(elems, {
      alignment: 'left',
      constrainWidth: false,
      coverTrigger: true
    });
  }

}
