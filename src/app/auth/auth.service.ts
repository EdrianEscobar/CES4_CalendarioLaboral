import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  login(nombreUsuario: string, clave: string): Observable<any> {
    const url = `${this.apiUrl}/validar/${nombreUsuario}/${clave}`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token guardado en localStorage:', response.token);
        } else {
          console.warn('No se recibió token en la respuesta');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
