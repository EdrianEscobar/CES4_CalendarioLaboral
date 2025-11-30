import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante
import { FormsModule } from '@angular/forms';   // Importante
import { FestivosService, FestivoDto } from '../festivos.service';
import { PaisesService } from '../../paises/paises.service';
import { Pais } from '../../paises/paises.service';

@Component({
  selector: 'app-festivos-anio',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos los módulos necesarios
  templateUrl: './festivos-anio.html',
  styleUrls: ['./festivos-anio.css']
})
export class FestivosAnioComponent implements OnInit {

  // Variables del formulario
  anioSeleccionado: number = new Date().getFullYear(); // Por defecto el año actual
  idPaisSeleccionado: number = 0;
  
  // Datos
  paises: Pais[] = [];
  festivos: FestivoDto[] = [];
  
  // Estado
  cargando: boolean = false;
  busquedaRealizada: boolean = false; // Para saber si mostrar la tabla o no

  constructor(
    private festivosService: FestivosService,
    private paisesService: PaisesService
  ) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises() {
    this.paisesService.listar().subscribe({
      next: (data) => this.paises = data,
      error: (err) => console.error('Error al cargar países', err)
    });
  }

  buscarFestivos() {
    if (this.idPaisSeleccionado === 0 || !this.anioSeleccionado) {
      alert("Por favor selecciona un país y un año válido.");
      return;
    }

    this.cargando = true;
    this.busquedaRealizada = false;
    this.festivos = [];

    this.festivosService.listarPorAnio(this.idPaisSeleccionado, this.anioSeleccionado).subscribe({
      next: (data) => {
        this.festivos = data;
        this.cargando = false;
        this.busquedaRealizada = true;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.busquedaRealizada = true;
      }
    });
  }
}