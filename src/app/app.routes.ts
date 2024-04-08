import { Routes } from '@angular/router';
import {stepTwoGuard} from "./guards/step-two.guard";
import {stepThreeGuard} from "./guards/step-three.guard";

export const routes: Routes = [
  {
    path: 'step-one',
    loadComponent: () => import('./configuration-process/model-selection/model-selection.component').then((x) => x.ModelSelectionComponent),
  },
  {
    path: 'step-two',
    canActivate: [stepTwoGuard],
    loadComponent: () => import('./configuration-process/options-selection/options-selection.component').then((x) => x.OptionsSelectionComponent),
  },
  {
    path: 'step-three',
    canActivate: [stepThreeGuard],
    loadComponent: () => import('./configuration-process/summary/summary.component').then((x) => x.SummaryComponent),
  },
  {
    path: '**',
    redirectTo: 'step-one',
    pathMatch: 'full'
  }
];
