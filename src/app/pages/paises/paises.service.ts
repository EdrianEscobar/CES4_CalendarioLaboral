import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pais {
  id: number;
  nombre: string;
} 

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private apiUrl = 'http://localhost:8080/api/paises';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}/listar`);
  }

  obtener(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/obtener/${id}`);
  }

  agregar(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(`${this.apiUrl}/agregar`, pais);
  }

  modificar(pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/modificar`, pais);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/eliminar/${id}`);
  }
  
}
