import { Routes } from '@angular/router';
import { pendingChangesGuard } from '@providers/state/pending-changes/pending-changes-guard';
export const palettesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-list/palette-list').then(m => m.PaletteList)
  },
  {
    path: 'create-palette',
    loadComponent: () => import('./create-palette/create-palette').then(m => m.CreatePalette),
    canDeactivate: [pendingChangesGuard],
  },
]