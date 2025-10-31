import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipofestivoRoutingModule } from './tipofestivo-routing-module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListarTipofestivoComponent } from './listar/listar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TipofestivoRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    ListarTipofestivoComponent
  ]
})
export class TipofestivoModule { }
