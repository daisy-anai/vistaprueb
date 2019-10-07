import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-area',
  templateUrl: './title-area.component.html',
  styleUrls: ['./title-area.component.css']
})
export class TitleAreaComponent {
  @Input() title: String;
  @Input() icon: String;

  constructor() { }
}
