import { Routes } from '@angular/router';
export const paletteRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-detail/palette-detail').then(m => m.PaletteDetail)
  }
]