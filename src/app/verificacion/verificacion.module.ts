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
import { CheckVerificacionFisicoMecanicaComponent } from './check-verificacion-fisico-mecanica/check-verificacion-fisico-mecanica.component';
import { ReporteFisicoMecanicaComponent } from './reporte-fisico-mecanica/reporte-fisico-mecanica.component';
import { ReporteFinalFisicoMecanicaComponent } from './reporte-final-fisico-mecanica/reporte-final-fisico-mecanica.component';
import { HistoriaComponent } from './historia/historia.component';

@NgModule({
  declarations: [
    CheckVerificacionCromaticaComponent,
    SeleccionCatalogoComponent,
    ReporteFinalCromaticaComponent,
    ReporteCromaticaComponent,
    SeleccionCromaticaComponent,
    SeleccionFisicoMecanicaComponent,
    CheckVerificacionFisicoMecanicaComponent,
    ReporteFisicoMecanicaComponent,
    HistoriaComponent,
    ReporteFinalFisicoMecanicaComponent
    
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
