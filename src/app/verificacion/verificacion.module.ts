import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routing
import { VerificacionRoutingModule} from './verificacion-routing.module';

// Modules
import { ComponentsModule } from '../shared/components/components.module';


//components
import { CheckVerificacionCromaticaComponent} from './check-verificacion-cromatica/check-verificacion-cromatica.component';
import { SeleccionCatalogoComponent } from'./seleccion-catalogo/seleccion-catalogo.component';
import { ReporteFinalCromaticaComponent} from './check-verificacion-cromatica/reporte-final-cromatica/reporte-final-cromatica.component';
import { ReporteCromaticaComponent } from './check-verificacion-cromatica/reporte-cromatica/reporte-cromatica.component';
@NgModule({
  declarations: [
    CheckVerificacionCromaticaComponent,
    SeleccionCatalogoComponent,
    ReporteFinalCromaticaComponent,
    ReporteCromaticaComponent
  ],
  imports: [
    VerificacionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class VerificacionModule { }
