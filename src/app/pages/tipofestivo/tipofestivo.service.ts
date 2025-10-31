import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoFestivo {
  id: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipofestivoService {
  private apiUrl = 'http://localhost:8080/api/tiposfestivos'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  obtener(id: number): Observable<TipoFestivo> {
    return this.http.get<TipoFestivo>(`${this.apiUrl}/obtener/${id}`);
  }

  agregar(tipoFestivo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.post<TipoFestivo>(`${this.apiUrl}/agregar`, tipoFestivo);
  }

  modificar(tipoFestivo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.put<TipoFestivo>(`${this.apiUrl}/modificar`, tipoFestivo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
  
}
