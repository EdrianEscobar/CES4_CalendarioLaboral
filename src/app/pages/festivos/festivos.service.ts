import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Festivo {
  id: number;
  nombre: string;
  dia: number;
  mes: number;
  diasPascua: number;
  pais: { id: number; nombre: string };
  tipo: { id: number; tipo: string };
}

@Injectable({
  providedIn: 'root'
})

export class FestivosService {
  private apiUrl = 'http://localhost:8080/api/festivos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.apiUrl}/listar`);
  }

  obtener(id: number): Observable<Festivo> {
    return this.http.get<Festivo>(`${this.apiUrl}/obtener/${id}`);
  }

  agregar(festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.apiUrl}/agregar`, festivo);
  }

  modificar(festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.apiUrl}/modificar`, festivo);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/eliminar/${id}`);
  }
}
