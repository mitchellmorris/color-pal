import { Routes } from '@angular/router';
export const paletteRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-update-form/palette-update-form').then(m => m.PaletteUpdateForm)
  }
]