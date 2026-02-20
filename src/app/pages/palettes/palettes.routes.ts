import { Routes } from '@angular/router';
export const palettesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-list/palette-list').then(m => m.PaletteList)
  }
]