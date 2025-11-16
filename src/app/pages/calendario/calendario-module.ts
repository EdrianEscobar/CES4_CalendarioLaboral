import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListarCalendario } from './listar/listar';

const routes: Routes = [
  { path: '', component: ListarCalendario } 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListarCalendario
  ]
})
export class CalendarioModule { }
