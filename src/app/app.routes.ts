import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'mobile',
    loadChildren: () => import('./components/tabs/tabs.routes').then((r)=> r.routes)
  }
];
