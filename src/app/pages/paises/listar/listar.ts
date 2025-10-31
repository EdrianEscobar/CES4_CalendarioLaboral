import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService, Pais } from '../paises.service';

@Component({
  selector: 'app-listar-paises',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource: Pais[] = [];
  form!: FormGroup;
  modoEdicion = false;

  constructor(
    private paisesService: PaisesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarPaises();
  }

  inicializarFormulario() {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required]
    });
  }

  cargarPaises() {
    this.paisesService.listar().subscribe({
      next: (data) => (this.dataSource = data),
      error: () => this.mostrarMensaje('Error al cargar los países')
    });
  }

  guardar() {
    const pais = this.form.value as Pais;
    if (this.modoEdicion) {
      this.paisesService.modificar(pais).subscribe(() => {
        this.mostrarMensaje('✅ País actualizado correctamente');
        this.cargarPaises();
        this.cancelar();
      });
    } else {
      this.paisesService.agregar(pais).subscribe(() => {
        this.mostrarMensaje('✅ País agregado correctamente');
        this.cargarPaises();
        this.cancelar();
      });
    }
  }

  editar(pais: Pais) {
    this.modoEdicion = true;
    this.form.patchValue(pais);
  }

  eliminar(id: number) {
    if (confirm('¿Desea eliminar este país?')) {
      this.paisesService.eliminar(id).subscribe(() => {
        this.mostrarMensaje('🗑️ País eliminado');
        this.cargarPaises();
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
