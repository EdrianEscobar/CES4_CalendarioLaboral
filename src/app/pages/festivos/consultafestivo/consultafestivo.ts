import { Component, OnInit } from '@angular/core';
import { FestivosService } from '../festivos.service';
import { PaisesService } from '../../paises/paises.service';
import { Pais } from '../../paises/paises.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultafestivo',
  imports: [
    CommonModule, 
    FormsModule 
  ],
  templateUrl: './consultafestivo.html',
  styleUrl: './consultafestivo.css'
})
export class Consultafestivo implements OnInit {

  fechaSeleccionada: string = ''; 
  paisSeleccionadoId: number = 0; 
  paises: Pais[] = []; 

  esFestivoResultado: boolean | null = null;
  mensajeResultado: string = '';
  cargando: boolean = false; 

  constructor(
    private festivoService: FestivosService,
    private paisesService: PaisesService 
  ) { }

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.paisesService.listar().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (err) => {
        console.error('Error cargando países:', err);
      }
    });
  }

  consultarFestivo(): void {
    if (!this.fechaSeleccionada || this.paisSeleccionadoId === 0) {
      this.mensajeResultado = 'Por favor, selecciona una fecha y un país.';
      this.esFestivoResultado = null;
      return;
    }

    this.cargando = true;
    this.esFestivoResultado = null;
    this.mensajeResultado = '';

    this.festivoService.esFestivo(this.fechaSeleccionada, this.paisSeleccionadoId).subscribe({
      next: (esFestivo: boolean) => {
        this.esFestivoResultado = esFestivo;
        if (esFestivo) {
          this.mensajeResultado = `La fecha ${this.fechaSeleccionada} SÍ es un día festivo.`;
        } else {
          this.mensajeResultado = `La fecha ${this.fechaSeleccionada} NO es un día festivo.`;
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consultar festivo:', err);
        this.mensajeResultado = `Error en la consulta: ${err.error || 'No se pudo verificar'}`;
        this.esFestivoResultado = null;
        this.cargando = false;
      }
    });
  }

}
