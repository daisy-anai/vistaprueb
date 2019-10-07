import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionVehiculoComponent } from '../revision-cromatica/revision-vehiculo/revision-vehiculo.component';


@NgModule({
  declarations: [RevisionVehiculoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RevisionVehiculoComponent
  ]
})
export class RevisionCromaticaModule { }
