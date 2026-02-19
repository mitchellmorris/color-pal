import { Routes } from '@angular/router';
export const palettesRoutes = [
  {
    path: '',
    loadComponent: () => import('./palette-list/palette-list').then(m => m.PaletteList)
  }
]