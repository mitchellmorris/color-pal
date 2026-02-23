import { Routes } from '@angular/router';
export const palettesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-list/palette-list').then(m => m.PaletteList)
  },
  {
    path: 'create-palette',
    loadComponent: () => import('./create-palette/create-palette').then(m => m.CreatePalette)
  },
]