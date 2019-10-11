import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    SearchPipe
  ],
  imports: [],
  exports: [
    SearchPipe
  ]
})
export class FiltersModule { }
