import { Component, Input } from '@angular/core';

interface Option {
  [index: number]: {
    urn: String,
    icon: String
  }
}

@Component({
  selector: 'semovi-card-header',
  templateUrl: './semovi-card-header.component.html',
  styleUrls: ['./semovi-card-header.component.css'],
})
export class SemoviCardHeaderComponent {
  @Input() title: String;
  @Input() icon: String;
  @Input() urn: String;
  @Input() options: Option[];

  constructor() { }
}
