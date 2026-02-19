import { Routes } from '@angular/router';
import { palettesResolver } from './pages/palettes/palettes-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/palettes/palettes').then(m => m.Palettes),
    resolve: {
      palettes: palettesResolver
    }
  }
];
