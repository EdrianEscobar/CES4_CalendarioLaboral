import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';         
import { CommonModule } from '@angular/common';      
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,                                   
  imports: [CommonModule, FormsModule],                
  templateUrl: './login.html',
  styleUrls: ['./login.css']                           
})
export class Login {

  nombreUsuario = '';
  clave = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.nombreUsuario, this.clave).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);

        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']); 
          
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.error = 'Error de conexión o credenciales inválidas';
      }
    });
  }

}
