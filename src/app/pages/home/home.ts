import { Component, OnInit } from '@angular/core'; 
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit { 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token'); 

    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}