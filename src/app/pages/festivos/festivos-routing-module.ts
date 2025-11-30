import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFestivos } from './listar/listar';
import { Consultafestivo } from './consultafestivo/consultafestivo';
import { FestivosAnioComponent } from './festivos-anio/festivos-anio';

const routes: Routes = [
  { path: '', component: ListarFestivos },
  { path: 'consultar', component: Consultafestivo },
  { path: 'calendario', component: FestivosAnioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FestivosRoutingModule { }
