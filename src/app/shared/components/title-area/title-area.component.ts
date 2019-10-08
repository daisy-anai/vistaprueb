import { Component, Input } from '@angular/core';

interface Option {
  [index: number]: {
    key: String,
    urn: String,
    icon: String
  }
}

@Component({
  selector: 'title-area',
  templateUrl: './title-area.component.html',
  styleUrls: ['./title-area.component.css']
})
export class TitleAreaComponent {
  @Input() title: String;
  @Input() icon: String;
  @Input() urn: String;
  @Input() options: Option[];

  constructor() { }
}
