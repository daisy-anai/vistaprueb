import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CrearCatalogoComponent } from './crear-catalogo/crear-catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { EditarCatalogoComponent } from './editar-catalogo/editar-catalogo.component';
import { ListarCatalogoComponent } from './listar-catalogo/listar-catalogo.component';
import { ListaCatatalogoModalidadComponent } from './lista-catatalogo-modalidad/lista-catatalogo-modalidad.component';

const routes: Routes = [
  { path: '', component: ListarCatalogoComponent },
  { path: 'detalle/:id', component: DetalleCatalogoComponent },
  { path: 'crear', component: CrearCatalogoComponent },
  { path: 'modificar/:id', component: EditarCatalogoComponent },
  { path: 'listamodalidad/:id', component: ListaCatatalogoModalidadComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
