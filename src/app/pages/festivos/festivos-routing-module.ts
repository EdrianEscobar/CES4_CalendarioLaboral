import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFestivos } from './listar/listar';
import { Consultafestivo } from './consultafestivo/consultafestivo';

const routes: Routes = [
  { path: '', component: ListarFestivos },
  { path: 'consultar', component: Consultafestivo }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FestivosRoutingModule { }
