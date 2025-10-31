import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tipo {
  id: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})

export class TipoService {
  private apiUrl = 'http://localhost:8080/api/tipos';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  obtener(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/obtener/${id}`);
  }

  agregar(tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(`${this.apiUrl}/agregar`, tipo);
  }

  modificar(tipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.apiUrl}/modificar`, tipo);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/eliminar/${id}`);
  }

}
