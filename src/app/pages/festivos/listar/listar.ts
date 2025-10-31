import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FestivosService, Festivo } from '../festivos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-listar-festivos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class ListarFestivos implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'dia', 'mes', 'pais', 'tipo', 'acciones'];
  dataSource: Festivo[] = [];
  form!: FormGroup;
  modoEdicion = false;

  constructor(
    private festivosService: FestivosService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      diasPascua: [false],
      pais: this.fb.group({
        id: [null]
      }),
      tipo: this.fb.group({
        id: [null]
      })
    });

    this.cargarFestivos();
  }

  cargarFestivos() {
    this.festivosService.listar().subscribe({
      next: (data) => {
        console.log('✅ Festivos cargados:', data);
        this.dataSource = [...data]; 
      },
      error: (err) => console.error('Error al listar festivos:', err)
    });
  }

  guardar() {
    const festivo = this.form.value as Festivo;
    if (this.modoEdicion) {
      this.festivosService.modificar(festivo).subscribe(() => {
        this.mostrarMensaje('Festivo actualizado correctamente');
        this.cargarFestivos();
        this.cancelar();
      });
    } else {
      this.festivosService.agregar(festivo).subscribe(() => {
        this.mostrarMensaje('Festivo agregado correctamente');
        this.cargarFestivos();
        this.cancelar();
      });
    }
  }

  editar(festivo: Festivo) {
    this.modoEdicion = true;
    this.form.patchValue(festivo);
  }

  eliminar(id: number) {
    if (confirm('¿Desea eliminar este festivo?')) {
      this.festivosService.eliminar(id).subscribe(() => {
        this.mostrarMensaje('Festivo eliminado');
        this.cargarFestivos();
      });
    }
  }

  cancelar() {
    this.modoEdicion = false;
    this.form.reset();
  }

  mostrarMensaje(msg: string) {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }
}