import { Component, OnInit } from '@angular/core';
import { TipofestivoService, TipoFestivo } from '../tipofestivo.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class ListarTipofestivoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tipo', 'acciones'];
  dataSource: TipoFestivo[] = [];
  form!: FormGroup;
  modoEdicion = false;

  constructor(
    private service: TipofestivoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      tipo: ['', Validators.required]
    });
    this.cargarTiposFestivo();
  }

  cargarTiposFestivo(): void {
    this.service.listar().subscribe({
      next: (data) => (this.dataSource = data),
      error: () => this.mostrarMensaje('Error al cargar tipos de festivo')
    });
  }

  guardar(): void {
    const tipoFestivo = this.form.value as TipoFestivo;
    if (this.modoEdicion) {
      this.service.modificar(tipoFestivo).subscribe(() => {
        this.mostrarMensaje('Tipo de festivo actualizado');
        this.cargarTiposFestivo();
        this.cancelar();
      });
    } else {
      this.service.agregar(tipoFestivo).subscribe(() => {
        this.mostrarMensaje('Tipo de festivo agregado');
        this.cargarTiposFestivo();
        this.cancelar();
      });
    }
  }

  editar(tf: TipoFestivo): void {
    this.modoEdicion = true;
    this.form.patchValue(tf);
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar este tipo de festivo?')) {
      this.service.eliminar(id).subscribe(() => {
        this.mostrarMensaje('Tipo de festivo eliminado');
        this.cargarTiposFestivo();
      });
    }
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.form.reset();
  }

  mostrarMensaje(msg: string): void {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }
}
