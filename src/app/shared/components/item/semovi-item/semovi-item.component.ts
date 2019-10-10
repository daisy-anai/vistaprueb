import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'semovi-item',
  templateUrl: './semovi-item.component.html',
  styleUrls: ['./semovi-item.component.css']
})
export class SemoviItemComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
}
