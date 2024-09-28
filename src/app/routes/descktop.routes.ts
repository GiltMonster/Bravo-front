import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'desc/produto/:id',
    loadComponent: () => import('../pages/desc-produto/desc-produto.component').then((m) => m.DescProdutoComponent),
  },
  {
    path: '**',
    loadComponent: () => import('../pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  }
];
