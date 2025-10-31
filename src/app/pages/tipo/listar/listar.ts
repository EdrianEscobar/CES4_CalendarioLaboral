import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TipoService, Tipo } from '../tipo.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class ListarTipoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'tipo', 'acciones'];
  dataSource: Tipo[] = [];
  form!: FormGroup;
  modoEdicion = false;

  constructor(
    private tipoService: TipoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      tipo: ['', Validators.required]
    });
    this.cargarTipos();
  }

  cargarTipos() {
    this.tipoService.listar().subscribe({
      next: (data) => (this.dataSource = data),
      error: () => this.mostrarMensaje('Error al cargar los tipos')
    });
  }

  guardar() {
    const tipo = this.form.value as Tipo;
    if (this.modoEdicion) {
      this.tipoService.modificar(tipo).subscribe(() => {
        this.mostrarMensaje('Tipo actualizado correctamente');
        this.cargarTipos();
        this.cancelar();
      });
    } else {
      this.tipoService.agregar(tipo).subscribe(() => {
        this.mostrarMensaje('Tipo agregado correctamente');
        this.cargarTipos();
        this.cancelar();
      });
    }
  }

  editar(tipo: Tipo) {
    this.modoEdicion = true;
    this.form.patchValue(tipo);
  }

  eliminar(id: number) {
    if (confirm('¿Desea eliminar este tipo?')) {
      this.tipoService.eliminar(id).subscribe(() => {
        this.mostrarMensaje('Tipo eliminado');
        this.cargarTipos();
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