import { Component, OnInit } from '@angular/core';
import { CalendarioService, Calendario } from '../calendario';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-calendario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class ListarCalendario implements OnInit {
  form!: FormGroup;
  dataSource: Calendario[] = [];
  displayedColumns: string[] = ['fecha', 'tipo', 'descripcion', 'pais'];

  constructor(
    private fb: FormBuilder,
    private calendarioService: CalendarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idPais: ['', Validators.required],
      año: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  listar() {
    const { idPais, año } = this.form.value;
    if (!this.form.valid) {
      this.mostrarMensaje('Por favor completa los campos');
      return;
    }
    this.calendarioService.listar(idPais, año).subscribe({
      next: (data) => {
        this.dataSource = data;
        this.mostrarMensaje('Datos cargados correctamente');
      },
      error: () => this.mostrarMensaje('Error al listar el calendario')
    });
  }

  generar() {
    const { idPais, año } = this.form.value;
    if (!this.form.valid) {
      this.mostrarMensaje('Por favor completa los campos');
      return;
    }
    this.calendarioService.generar(idPais, año).subscribe({
      next: () => {
        this.mostrarMensaje('Calendario generado exitosamente');
        this.listar(); // recarga la tabla
      },
      error: () => this.mostrarMensaje('Error al generar el calendario')
    });
  }

  mostrarMensaje(msg: string) {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }
}