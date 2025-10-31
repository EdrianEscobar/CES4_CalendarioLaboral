import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTipoComponent } from './listar/listar';

const routes: Routes = [
  { path: '', component: ListarTipoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposRoutingModule { }
