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
import { ReporteFinalCromaticaComponent} from './reporte-final-cromatica/reporte-final-cromatica.component';
import { ReporteCromaticaComponent } from './reporte-cromatica/reporte-cromatica.component';
import { SeleccionCromaticaComponent} from './seleccion-cromatica/seleccion-cromatica.component';
import { SeleccionFisicoMecanicaComponent } from './seleccion-fisico-mecanica/seleccion-fisico-mecanica.component';

@NgModule({
  declarations: [
    CheckVerificacionCromaticaComponent,
    SeleccionCatalogoComponent,
    ReporteFinalCromaticaComponent,
    ReporteCromaticaComponent,
    SeleccionCromaticaComponent,
    SeleccionFisicoMecanicaComponent
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
