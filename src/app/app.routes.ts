import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/descktop.routes').then((r) => r.routes),
  },
  {
    path: 'mobile',
    loadChildren: () => import('./components/tabs/tabs.routes').then((r)=> r.routes)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  }
];
