import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTipofestivoComponent } from './listar/listar';

const routes: Routes = [
  {
    path: '',
    component: ListarTipofestivoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipofestivoRoutingModule { }
