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
    path: 'login',
    loadComponent: () => import('../pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('../pages/create-account/create-account.page').then( m => m.CreateAccountPage)
  }
];
