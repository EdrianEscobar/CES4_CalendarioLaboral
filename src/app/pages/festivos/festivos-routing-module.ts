import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFestivos } from './listar/listar';

const routes: Routes = [
  { path: '', component: ListarFestivos }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FestivosRoutingModule { }
