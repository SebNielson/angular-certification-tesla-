import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./configuration-process/configuration-process.component').then((x) => x.ConfigurationProcessComponent),
  },
];
