import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'my-ideas',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/my-ideas/my-ideas.component'),
  },
  {
    path: 'saved-ideas',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/saved-ideas/saved-ideas.component'),
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'signup',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./pages/signup/signup.component'),
  },
  {
    path: 'confirmation',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./pages/confirmation/confirmation.component'),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component'),
  },
  { path: '**', redirectTo: 'not-found' },
];
