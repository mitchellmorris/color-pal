import { Routes } from '@angular/router';
import { palettesResolver } from './pages/palettes/palettes-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/palettes/palettes').then(m => m.Palettes),
    loadChildren: () => import('./pages/palettes/palettes.routes').then(m => m.palettesRoutes),
    resolve: {
      palettes: palettesResolver
    }
  }
];
