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
    loadComponent: () => import('../pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('../pages/create-account/create-account.page').then(m => m.CreateAccountPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('../pages/accont/accont.page').then(m => m.AccontPage)
  },
  {
    path: 'info-perfil',
    loadComponent: () => import('../pages/info-perfil/info-perfil.page').then(m => m.InfoPerfilPage)
  },
  {
    path: 'enderecos',
    loadComponent: () => import('../pages/info-endereco/info-endereco.page').then(m => m.InfoEnderecoPage)
  },
  {
    path: 'carrinho',
    loadComponent: () => import('../pages/carrinho/carrinho.page').then(m => m.CarrinhoPage)
  },
  {
    path: 'pedidos',
    loadComponent: () => import('../pages/pedidos/pedidos.page').then( m => m.PedidosPage)
  }
];
