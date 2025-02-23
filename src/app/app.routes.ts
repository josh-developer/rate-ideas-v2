import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'my-ideas',
    loadComponent: () => import('./pages/my-ideas/my-ideas.component'),
  },
  {
    path: 'saved-ideas',
    loadComponent: () => import('./pages/saved-ideas/saved-ideas.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component'),
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation.component'),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./shared/components/not-found/not-found.component'),
  },
  { path: '**', redirectTo: 'not-found' },
];
