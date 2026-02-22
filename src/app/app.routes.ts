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
  },
  {
    path: 'palette/:paletteId',
    loadComponent: () => import('./pages/palette/palette').then(m => m.Palette),
    loadChildren: () => import('./pages/palette/palette.routes').then(m => m.paletteRoutes),
    resolve: {
      palettes: palettesResolver
    }
  },
  {
    path: 'readme',
    loadComponent: () => import('./pages/read-me/read-me').then(m => m.ReadMe),
  },
  // The Wildcard Route (Must be last!)
  { 
    path: '**', 
    loadComponent: () => import('./pages/page-not-found/page-not-found').then(m => m.PageNotFound) 
  }
];
