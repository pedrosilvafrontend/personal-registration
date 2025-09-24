import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list').then(m => m.List)
  },
  {
    path: 'record',
    loadComponent: () => import('./pages/record/record').then(m => m.Record)
  },
  {
    path: 'record/:id',
    loadComponent: () => import('./pages/record/record').then(m => m.Record)
  },
  {
    path: '**',
    redirectTo: '/list',
  }
];
