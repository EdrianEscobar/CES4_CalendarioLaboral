import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FestivosRoutingModule } from './festivos-routing-module'; 
import { Consultafestivo } from './consultafestivo/consultafestivo'; 
import { ListarFestivos } from './listar/listar'; 

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FestivosRoutingModule,
    FormsModule 
  ]
})
export class FestivosModule { }