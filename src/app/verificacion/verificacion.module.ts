import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routing
import { VerificacionRoutingModule} from './verificacion-routing.module';

// Modules
import { ComponentsModule } from '../shared/components/components.module';


//components
import { CheckVerificacionComponent} from './check-verificacion/check-verificacion.component';
import { SeleccionCatalogoComponent } from'./seleccion-catalogo/seleccion-catalogo.component';
import { ReporteFinalCromaticaComponent} from './reporte-final-cromatica/reporte-final-cromatica.component';
import { ReporteCromaticaComponent } from './reporte-cromatica/reporte-cromatica.component';
@NgModule({
  declarations: [
    CheckVerificacionComponent,
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
