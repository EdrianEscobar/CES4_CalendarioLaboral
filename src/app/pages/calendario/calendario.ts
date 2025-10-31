import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Calendario {
  id: number;
  fecha: string;
  tipo: { id: number; tipo: string };
  descripcion: string;
  pais: { id: number; nombre: string };
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private apiUrl = 'http://localhost:8080/api/calendario';

  constructor(private http: HttpClient) {}

  listar(idPais: number, año: number): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(`${this.apiUrl}/listar/${idPais}/${año}`);
  }

  generar(idPais: number, año: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/generar/${idPais}/${año}`);
  }
}
