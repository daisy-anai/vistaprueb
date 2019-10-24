import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';

const routes: Routes = [
  { path: '', component: ListarCatalogoComponent },
  { path: 'detalle/:id', component: DetalleCatalogoComponent },
  { path: 'crear/:id', component: CrearCatalogoComponent },
  { path: 'modificar/:id', component: EditarCatalogoComponent },
  { path: 'modalidad/:id', component: ListarCatalogoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
