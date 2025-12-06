import { Routes } from '@angular/router';
import { Home } from './home/home';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
    },
     { path: '', component: HomeComponent }, 
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { 
        path: 'paises', 
        loadChildren: () => import('./pages/paises/paises-module').then(m => m.PaisesModule) 
    },
    { 
        path: 'festivos', 
        loadChildren: () => import('./pages/festivos/festivos-module').then(m => m.FestivosModule) 
    },
    {
        path: 'tipos',
        loadChildren: () => import('./pages/tipo/tipo-module').then(m => m.TiposModule)
    },
    {
        path: 'tiposfestivos',
        loadChildren: () => import('./pages/tipofestivo/tipofestivo-module').then(m => m.TipofestivoModule)
    },
    {
        path: 'calendario',
        loadChildren: () => import('./pages/calendario/calendario-module').then(m => m.CalendarioModule)
    }

];
