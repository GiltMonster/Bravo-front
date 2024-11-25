import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'carrinho',
        loadComponent: () =>
          import('../../pages/carrinho/carrinho.page').then((m) => m.CarrinhoPage),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../../pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../../pages/accont/accont.page').then((m) => m.AccontPage),
      },
      {
        path: 'page',
        loadChildren: () =>
          import('../../routes/mobile.routes').then((m) => m.routes),
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  }
];
