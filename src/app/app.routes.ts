import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/descktop.routes').then((m) => m.routes),
  },
  {
    path: 'mobile',
    loadChildren: () => import('./components/tabs/tabs.routes').then((r)=> r.routes)
  }
];
