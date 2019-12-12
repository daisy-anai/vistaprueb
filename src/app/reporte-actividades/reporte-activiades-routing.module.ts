import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componet
import{ ActividadesComponent } from './actividades/actividades.component';

const routes: Routes = 
  [
    {path:'reporte', component: ActividadesComponent},
    { path: '**', redirectTo:''}
  ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteActiviadesRoutingModule { }
